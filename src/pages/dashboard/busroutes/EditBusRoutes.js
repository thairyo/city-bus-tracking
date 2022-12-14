import { useParams } from 'react-router-dom'
import { Button, Table, Modal, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import DashBoard from '../DashBoard'
import dragula from 'dragula'
import 'dragula/dist/dragula.css'
import { useBusStop } from 'hooks/useBusStop'
import { useFormik } from 'formik'
import {
  Box,
  Grid,
  FormControl,
  InputAdornment,
  TextField,
  Input,
  TextareaAutosize
} from '@mui/material'
import * as Yup from 'yup'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import { useBusRoutes } from 'hooks/useBusRoutes'
import danabus from 'danabus'
import { useRoad } from 'hooks/useRoad'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

mapboxgl.accessToken =
  'pk.eyJ1IjoidGhhaXJ5byIsImEiOiJjbDc4OTMzNzkwN2ZzM3ZueXE0NWdyNHB0In0.G_TZ_zbzQ8T7512A44nK9g'

const EditBusRoutes = () => {
  let { busrouteId } = useParams()
  const roadMap = useRoad()
  const [roadBusRoute, setRoadBusRoute] = useState([])

  const [isEditing, setIsEditing] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const busStops = useBusStop()
  const [dataSource, setDataSource] = useState([])
  const [directionMap, setDirectionMap] = useState([])
  const [popupMap, setPopupMap] = useState([])

  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(108.20911851153426)
  const [lat, setLat] = useState(16.06045710530602)
  const [zoom, setZoom] = useState(12)

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    })

    map.current.on('load', () => {
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: directionMap
          }
        }
      })
      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#8fbc8f',
          'line-width': 5
        }
      })

      // Points
      map.current.addSource('places', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: popupMap
        }
      })

      // Add a layer showing the places.
      map.current.addLayer({
        id: 'places',
        type: 'circle',
        source: 'places',
        paint: {
          'circle-color': '#4264fb',
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      })

      // Create a popup, but don't add it to the map yet.
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      })

      map.current.on('mouseenter', 'places', e => {
        // Change the cursor style as a UI indicator.
        map.current.getCanvas().style.cursor = 'pointer'

        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice()
        const description = e.features[0].properties.description

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map.current)
      })

      map.current.on('mouseleave', 'places', () => {
        map.current.getCanvas().style.cursor = ''
        popup.remove()
      })
    })
    map.current.on('mousemove', e => {
      document.getElementById('info').innerHTML =
        // `e.point` is the x, y coordinates of the `mousemove` event
        // relative to the top-left corner of the map.
        JSON.stringify(e.point) +
        '<br />' +
        // `e.lngLat` is the longitude, latitude geographical position of the event.
        JSON.stringify(e.lngLat.wrap())
    })
  }, [directionMap, popupMap])

  const formik = useFormik({
    initialValues: {
      nameBusStop: '',
      location: {
        lng: '',
        lat: ''
      },
      travelNear: '',
      travelTime: ''
    },
    validationSchema: Yup.object({
      nameBusStop: Yup.string()
        .min(3, 'T??n tr???m xe bu??t t???i thi???u tr??n 3 k?? t???!')
        .max(50, 'T??n tr???m xe bu??t kh??ng ???????c d??i qu?? 50 k?? t???!')
        .required('Ph???i ??i???n t??n tr???m xe bu??t!'),
      location: Yup.object({
        lat: Yup.string()
          .min(3, 'Kinh ????? t???i thi???u tr??n 3 k?? t???!')
          .max(30, 'V?? ????? kh??ng ???????c d??i qu?? 30 k?? t???!')
          .required('Ph???i ??i???n kinh ????? ?????a ??i???m!'),
        lng: Yup.string()
          .min(3, 'V?? ????? t???i thi???u tr??n 3 k?? t???!')
          .max(30, 'V?? ????? kh??ng ???????c d??i qu?? 30 k?? t???!')
          .required('Ph???i ??i???n v?? ????? ?????a ??i???m!')
      }),
      travelNear: Yup.string().required(
        'Ph???i ??i???n ?????a ??i???m du l???ch ??? g???n tr???m!'
      ),
      travelTime: Yup.string().required(
        'Ph???i ??i???n th???i gian di chuy???n gi???a 2 tr???m!'
      )
    })
  })

  const busroutes = useBusRoutes()
  const [busrouteParams, setBusRouteParams] = useState({})
  useEffect(() => {
    const busroute = busroutes.filter(br => br.id === busrouteId)
    setBusRouteParams(busroute)
    const dataFilter = busStops.filter(
      route =>
        route.codeBusRoute === busroute[0].codeBusRoute &&
        route.directionRoute === busroute[0].directionRoute
    )
    setDataSource(dataFilter)
  }, [busStops, busroutes, busrouteId])

  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id'
    },
    {
      key: '2',
      title: 'T??n tr???m xe bu??t',
      dataIndex: 'nameBusStop'
    },
    {
      key: '3',
      title: '?????a ??i???m du l???ch ??? g???n tr???m',
      dataIndex: 'travelNear'
    },
    {
      key: '4',
      title: 'Kinh ?????',
      render: params => <Typography>{params.location?.lng}</Typography>
    },
    {
      key: '5',
      title: 'V??? ?????',
      render: params => <Typography>{params.location?.lat}</Typography>
    },
    {
      key: '6',
      title: 'Th???i gian di chuy???n gi???a 2 tr???m',
      render: params => <Typography>{params.travelTime} ph??t</Typography>
    },
    {
      key: '7',
      title: 'Actions',
      render: record => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record)
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record)
              }}
              style={{ color: 'red', marginLeft: 12 }}
            />
          </>
        )
      }
    }
  ]

  const onAddStudent = async () => {
    const createNew = {
      codeBusRoute: busrouteParams[0].codeBusRoute,
      directionRoute: busrouteParams[0].directionRoute,
      ...formik.values
    }
    await danabus.createOneBusStop(createNew)
    setDataSource(dataSource)
    setIsAdd(false)
  }

  const onDeleteStudent = async record => {
    await danabus.removeBusStop(record.id)
    Modal.confirm({
      title: 'B???n c?? mu???n x??a tr???m xe b???n ???? ch???n?',
      okText: 'C??',
      okType: 'danger',
      onOk: () => {
        setDataSource(pre => {
          return pre.filter(student => student.id !== record.id)
        })
      }
    })
  }

  const onEditStudent = async record => {
    setIsEditing(true)
    await danabus.updatedBusStop(record.id)
    setEditingStudent({ ...record })
  }
  const resetEditing = () => {
    setIsEditing(false)
    setIsAdd(false)
    setEditingStudent(null)
  }

  const getIndexInParent = el => Array.from(el.parentNode.children).indexOf(el)

  const handleReorder = (dragIndex, draggedIndex) => {
    setDataSource(oldState => {
      const newState = [...oldState]
      const item = newState.splice(dragIndex, 1)[0]
      newState.splice(draggedIndex, 0, item)
      return newState
    })
  }

  useEffect(() => {
    let start
    let end
    const container = document.querySelector('.ant-table-tbody')
    const drake = dragula([container], {
      moves: el => {
        start = getIndexInParent(el)
        return true
      }
    })

    drake.on('drop', el => {
      end = getIndexInParent(el)
      handleReorder(start, end)
    })
  }, [])

  const editformik = useFormik({
    initialValues: {
      nameBusStop: editingStudent?.nameBusStop,
      location: {
        lng: editingStudent?.location?.lng,
        lat: editingStudent?.location?.lat
      },
      travelNear: editingStudent?.travelNear,
      travelTime: editingStudent?.travelTime
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      nameBusStop: Yup.string()
        .min(3, 'T??n tr???m xe bu??t t???i thi???u tr??n 3 k?? t???!')
        .max(50, 'T??n tr???m xe bu??t kh??ng ???????c d??i qu?? 50 k?? t???!')
        .required('Ph???i ??i???n t??n tr???m xe bu??t!'),
      location: Yup.object({
        lat: Yup.string()
          .min(3, 'Kinh ????? t???i thi???u tr??n 3 k?? t???!')
          .max(30, 'V?? ????? kh??ng ???????c d??i qu?? 30 k?? t???!')
          .required('Ph???i ??i???n kinh ????? ?????a ??i???m!'),
        lng: Yup.string()
          .min(3, 'V?? ????? t???i thi???u tr??n 3 k?? t???!')
          .max(30, 'V?? ????? kh??ng ???????c d??i qu?? 30 k?? t???!')
          .required('Ph???i ??i???n v?? ????? ?????a ??i???m!')
      }),
      travelNear: Yup.string().required(
        'Ph???i ??i???n ?????a ??i???m du l???ch ??? g???n tr???m!'
      ),
      travelTime: Yup.string().required(
        'Ph???i ??i???n th???i gian di chuy???n gi???a 2 tr???m!'
      )
    }),
    onSubmit: values => {
      console.log(values)
    }
  })

  const handleArtLine = () => {
    const dir = dataSource.map(i => Object.values(i.location))
    setDirectionMap(dir)

    let popup = []
    popup = dataSource.map(i => ({
      type: 'Feature',
      properties: {
        description: i.nameBusStop
      },
      geometry: {
        type: 'Point',
        coordinates: Object.values(i.location)
      }
    }))
    setPopupMap(popup)
  }

  const formikRoute = useFormik({
    initialValues: {
      codeBusRoute: busrouteParams[0]?.codeBusRoute,
      nameRoute: busrouteParams[0]?.nameRoute,
      directionRoute: busrouteParams[0]?.directionRoute || 'turn',
      drivingJourney: busrouteParams[0]?.drivingJourney,
      lineDistance: busrouteParams[0]?.lineDistance,
      operatingTime: busrouteParams[0]?.operatingTime,
      colorRoute: busrouteParams[0]?.colorRoute
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      codeBusRoute: Yup.string()
        .min(3, 'M?? s??? tuy???n xe bu??t t???i thi???u tr??n 3 k?? t???!')
        .max(7, 'M?? s??? tuy???n xe bu??t kh??ng ???????c d??i qu?? 7 k?? t???!')
        .required('Ph???i ??i???n m?? s??? tuy???n!'),
      nameRoute: Yup.string()
        .min(7, 'T??n tuy???n xe bu??t t???i thi???u tr??n 7 k?? t???!')
        .max(50, 'T??n tuy???n xe bu??t kh??ng ???????c d??i qu?? 50 k?? t???!')
        .required('Ph???i ??i???n t??n tuy???n xe bu??t!'),
      directionRoute: Yup.string().required('Ph???i ch???n chi???u c???a tuy???n xe!'),
      drivingJourney: Yup.string().max(1000, 'M?? t??? kh??ng ???????c d??i qu??!'),
      lineDistance: Yup.string().max(
        10,
        'Chi???u d??i tuy???n ???????ng kh??ng ???????c d??i qu?? 10 k?? t???!'
      ),
      operatingTime: Yup.string().max(
        20,
        'Th???i gian tuy???n ho???t ?????ng kh??ng ???????c d??i qu?? 20 k?? t???!'
      ),
      colorRoute: Yup.string().required('Ph???i ch???n m??u c???a tuy???n xe!')
    })
  })

  const [showModal, setShowModal] = useState(false)

  const handleSubmit = () => {
    setShowModal(true)
  }

  const onUpdated = async () => {
    await danabus.updatedBusRoute(busrouteId, busrouteParams)
    await danabus.updatedRoadMap(roadBusRoute[0].id, directionMap)
    setShowModal(false)
  }

  useEffect(() => {
    const filterRoad = roadMap.filter(
      r =>
        r.codeBusRoute === busrouteParams[0].codeBusRoute &&
        r.directionRoute === busrouteParams[0].directionRoute
    )
    setRoadBusRoute(filterRoad)
  }, [busrouteParams, roadMap])

  return (
    <DashBoard>
      <Modal
        title="B???n c?? ch???c v???i h??nh ?????ng n??y?"
        open={showModal}
        okText="Th??m m???i"
        cancelText="H???y"
        onCancel={() => setShowModal(false)}
        onOk={onUpdated}
      />
      <Typography
        style={{ fontSize: '20px', fontWeight: 'bold', padding: '20px' }}
      >
        Ch???nh s???a l??? tr??nh tuy???n xe bu??t
      </Typography>
      <div>
        <div id="info"></div>
        <div ref={mapContainer} className="map-container" />
      </div>
      <Button onClick={() => setIsAdd(true)}>Th??m tr???m xe bu??t m???i</Button>
      <Button onClick={handleArtLine}>V??? tuy???n m???i</Button>
      <Button onClick={handleSubmit}>X??c nh???n t???o m???i tuy???n</Button>
      <Typography
        style={{ fontSize: '20px', fontWeight: 'bold', padding: '20px' }}
      >
        Ch???nh s???a th??ng tin tuy???n
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography style={{ fontWeight: 'bold' }}>M?? s??? tuy???n</Typography>
          <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {formikRoute.values?.codeBusRoute}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography style={{ fontWeight: 'bold' }}>T??n tuy???n</Typography>
          <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {formikRoute.values?.nameRoute}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required sx={{ minWidth: 200 }}>
            <Typography style={{ fontWeight: 'bold' }}>
              Chi???u c???a tuy???n
            </Typography>
            <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>
              {formikRoute.values?.directionRoute === 'turn'
                ? 'Chi???u ??i'
                : 'Chi???u v???'}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography style={{ fontWeight: 'bold' }}>
            M?? t??? h??nh tr??nh
          </Typography>
          <TextareaAutosize
            style={{ minWidth: 500, minHeight: 200 }}
            id="drivingJourney"
            name="drivingJourney"
            type="text"
            value={formikRoute.values.drivingJourney}
            onChange={formikRoute.handleChange}
            error={
              formikRoute.touched.drivingJourney &&
              Boolean(formikRoute.errors.drivingJourney)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} style={{ display: 'flex' }}>
          <FormControl variant="standard">
            <Typography style={{ fontWeight: 'bold' }}>
              ????? d??i c???a tuy???n
            </Typography>
            <Input
              id="lineDistance"
              name="lineDistance"
              type="text"
              endAdornment={<InputAdornment position="end">km</InputAdornment>}
              value={formikRoute.values.lineDistance}
              onChange={formikRoute.handleChange}
              error={
                formikRoute.touched.lineDistance &&
                Boolean(formikRoute.errors.lineDistance)
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography style={{ fontWeight: 'bold' }}>
            Th???i gian tuy???n ho???t ?????ng
          </Typography>
          <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {formikRoute.values.operatingTime}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required sx={{ m: 1, minWidth: 200 }}>
            <TextField
              id="colorRoute"
              name="colorRoute"
              value={formikRoute.values.colorRoute}
              onChange={formikRoute.handleChange}
              type="color"
              label="M??u c???a tuy???n"
              error={
                formikRoute.touched.colorRoute &&
                Boolean(formikRoute.errors.colorRoute)
              }
            />
          </FormControl>
        </Grid>
      </Grid>
      <Typography
        style={{ fontSize: '20px', fontWeight: 'bold', padding: '20px' }}
      >
        Ch???nh s???a b???n xe bu??t trong tuy???n
      </Typography>
      <Table columns={columns} dataSource={dataSource} />

      {/* Input th??m tr???m xe */}
      <Modal
        title="Th??m tr???m xe bu??t m???i"
        open={isAdd}
        okText="Th??m m???i"
        cancelText="H???y"
        onCancel={() => {
          resetEditing()
        }}
        onOk={() => onAddStudent()}
      >
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TextField
            id="nameBusStop"
            name="nameBusStop"
            label="T??n tr???m xe bu??t"
            value={formik.values.nameBusStop}
            onChange={formik.handleChange}
            error={
              formik.touched.nameBusStop || Boolean(formik.errors.nameBusStop)
            }
            helperText={formik.errors.nameBusStop}
          />
          <TextField
            id="location.lng"
            name="location.lng"
            label="Kinh ?????"
            value={formik.values.location.lng}
            onChange={formik.handleChange}
            error={
              formik.touched.location?.lng ||
              Boolean(formik.errors.location?.lng)
            }
            helperText={formik.errors.location?.lng}
          />
          <TextField
            id="location.lat"
            name="location.lat"
            label="V??? ?????"
            value={formik.values.location.lat}
            onChange={formik.handleChange}
            error={
              formik.touched.location?.lat ||
              Boolean(formik.errors.location?.lat)
            }
            helperText={formik.errors.location?.lat}
          />
          <TextField
            id="travelNear"
            name="travelNear"
            label="?????a ??i???m du l???ch g???n tr???m xe"
            value={formik.values.travelNear}
            onChange={formik.handleChange}
            error={
              formik.touched.travelNear || Boolean(formik.errors.travelNear)
            }
            helperText={formik.errors.travelNear}
          />
          <TextField
            id="travelTime"
            name="travelTime"
            label="Th???i gian di chuy???n gi???a 2 tr???m"
            value={formik.values.travelTime}
            onChange={formik.handleChange}
            error={
              formik.touched.travelTime || Boolean(formik.errors.travelTime)
            }
            helperText={formik.errors.travelTime}
          />
        </Box>
      </Modal>

      {/* Edit tr???m xe */}
      <Modal
        title="S???a th??ng tin tr???m xe bu??t"
        open={isEditing}
        okText="L??u l???i"
        cancelText="H???y"
        onCancel={() => {
          resetEditing()
        }}
        onOk={e => {
          setDataSource(pre => {
            return pre.map(student => {
              if (student.id === editingStudent.id) {
                return editformik.values
              } else {
                return student
              }
            })
          })
          resetEditing()
        }}
      >
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TextField
            id="nameBusStop"
            name="nameBusStop"
            label="T??n tr???m xe bu??t"
            value={editformik.values.nameBusStop}
            onChange={editformik.handleChange}
            error={
              editformik.touched.nameBusStop ||
              Boolean(editformik.errors.nameBusStop)
            }
            helperText={editformik.errors.nameBusStop}
          />
          <TextField
            id="location.lng"
            name="location.lng"
            label="Kinh ?????"
            value={editformik.values.location.lng}
            onChange={editformik.handleChange}
            error={
              editformik.touched.location?.lng ||
              Boolean(editformik.errors.location?.lng)
            }
            helperText={editformik.errors.location?.lng}
          />
          <TextField
            id="location.lat"
            name="location.lat"
            label="V??? ?????"
            value={editformik.values.location.lat}
            onChange={editformik.handleChange}
            error={
              editformik.touched.location?.lat ||
              Boolean(editformik.errors.location?.lat)
            }
            helperText={editformik.errors.location?.lat}
          />
          <TextField
            id="travelNear"
            name="travelNear"
            label="?????a ??i???m du l???ch g???n tr???m xe"
            value={editformik.values.travelNear}
            onChange={editformik.handleChange}
            error={
              editformik.touched.travelNear ||
              Boolean(editformik.errors.travelNear)
            }
            helperText={editformik.errors.travelNear}
          />
          <TextField
            id="travelTime"
            name="travelTime"
            label="Th???i gian di chuy???n gi???a 2 tr???m"
            value={editformik.values.travelTime}
            onChange={editformik.handleChange}
            error={
              editformik.touched.travelTime ||
              Boolean(editformik.errors.travelTime)
            }
            helperText={editformik.errors.travelTime}
          />
        </Box>
      </Modal>
    </DashBoard>
  )
}

export default EditBusRoutes
