import { Table, Modal, Input, Space } from 'antd'
import { useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import DashBoard from '../DashBoard'
import { useFormik } from 'formik'
import {
  Box,
  Grid,
  InputLabel,
  MenuItem,
  TextareaAutosize,
  TextField,
  Typography,
  Select,
  Button
} from '@mui/material'
import * as Yup from 'yup'
import { useTravel } from 'hooks/useTravel'
import HTMLReactParser from 'html-react-parser'
import Resizer from 'react-image-file-resizer'
import { useRef } from 'react'
import Highlighter from 'react-highlight-words'

function Test() {
  const [isEditing, setIsEditing] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [dataSource, setDataSource] = useState([])

  // Search in Column
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = clearFilters => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close
    }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })

  const travels = useTravel()
  useEffect(() => {
    setDataSource(travels)
  }, [travels])

  const formik = useFormik({
    initialValues: {
      title: '',
      typeLocation: 'discover',
      image: '',
      imageDesc: '',
      description: '',
      locationLink: '',
      locationName: '',
      location: {
        lat: '',
        lng: ''
      }
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, 'T??n ?????a ??i???m t???i thi???u tr??n 5 k?? t???!')
        .max(50, 'T??n ?????a ??i???m kh??ng ???????c d??i qu?? 50 k?? t???!')
        .required('Ph???i ??i???n t??n ?????a ??i???m!'),
      typeLocation: Yup.string().required(),
      image: Yup.string().required(),
      imageDesc: Yup.string().max(100),
      description: Yup.string().max(1000, 'M?? t??? kh??ng ???????c d??i qu??!'),
      locationLink: Yup.string().max(
        255,
        '?????a ch??? kh??ng ???????c d??i qu?? 255 k?? t???!'
      ),
      locationName: Yup.string().max(
        255,
        '?????a ch??? tr??n google map kh??ng ???????c d??i qu?? 255 k?? t???!'
      ),
      location: Yup.object({
        lat: Yup.string()
          .min(3, 'Kinh ????? t???i thi???u tr??n 3 k?? t???!')
          .max(30, 'Kinh ????? kh??ng ???????c d??i qu?? 30 k?? t???!')
          .required('Ph???i ??i???n kinh ????? ?????a ??i???m!'),
        lng: Yup.string()
          .min(3, 'V?? ????? t???i thi???u tr??n 3 k?? t???!')
          .max(30, 'V?? ????? kh??ng ???????c d??i qu?? 30 k?? t???!')
          .required('Ph???i ??i???n v?? ????? ?????a ??i???m!')
      })
    })
  })

  const editformik = useFormik({
    initialValues: {
      title: editingStudent?.title,
      locationName: editingStudent?.locationName,
      typeLocation: editingStudent?.typeLocation || 'discover',
      locationLink: editingStudent?.locationLink,
      location: {
        lat: editingStudent?.location?.lat,
        lng: editingStudent?.location?.lng
      },
      description: editingStudent?.description,
      image: editingStudent?.image
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, 'T??n ?????a ??i???m t???i thi???u tr??n 5 k?? t???!')
        .max(50, 'T??n ?????a ??i???m kh??ng ???????c d??i qu?? 50 k?? t???!')
        .required('Ph???i ??i???n t??n ?????a ??i???m!'),
      typeLocation: Yup.string().required(),
      image: Yup.string().required(),
      imageDesc: Yup.string().max(100),
      description: Yup.string().max(1000, 'M?? t??? kh??ng ???????c d??i qu??!'),
      locationLink: Yup.string().max(
        255,
        '?????a ch??? kh??ng ???????c d??i qu?? 255 k?? t???!'
      ),
      locationName: Yup.string().max(
        255,
        '?????a ch??? tr??n google map kh??ng ???????c d??i qu?? 255 k?? t???!'
      ),
      location: Yup.object({
        lat: Yup.string()
          .min(3, 'Kinh ????? t???i thi???u tr??n 3 k?? t???!')
          .max(30, 'Kinh ????? kh??ng ???????c d??i qu?? 30 k?? t???!')
          .required('Ph???i ??i???n kinh ????? ?????a ??i???m!'),
        lng: Yup.string()
          .min(3, 'V?? ????? t???i thi???u tr??n 3 k?? t???!')
          .max(30, 'V?? ????? kh??ng ???????c d??i qu?? 30 k?? t???!')
          .required('Ph???i ??i???n v?? ????? ?????a ??i???m!')
      })
    })
  })

  // resize image base64 to (250x250)
  const resizeFile = file =>
    new Promise(resolve => {
      Resizer.imageFileResizer(
        file,
        250,
        250,
        'JPEG',
        100,
        0,
        uri => {
          resolve(uri)
        },
        'base64'
      )
    })

  const [newImage, setImage] = useState('')
  const convert2base64 = async e => {
    const file = e.target.files[0]
    const reader = await resizeFile(file)
    setImage(reader)
  }

  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id',
      width: 100
    },
    {
      key: '2',
      title: 'T??n ?????a ??i???m',
      dataIndex: 'title',
      width: 150,
      ...getColumnSearchProps('title')
    },
    {
      key: '3',
      title: '?????a ch???',
      dataIndex: 'locationName',
      width: 150,
      ...getColumnSearchProps('locationName')
    },
    {
      key: '4',
      title: 'H??nh ???nh',
      render: params => (
        <img
          style={{ maxWidth: '100%' }}
          src={params.image}
          alt={params.image}
        />
      ),
      width: 150
    },
    {
      key: '5',
      title: 'Lo???i H??nh Du l???ch',
      dataIndex: 'typeLocation',
      width: 150,
      filters: [
        { text: '?????a ??i???m kh??m ph??', value: 'discover' },
        { text: '?????a ??i???m v??n h??a', value: 'cultural' },
        { text: '?????a ??i???m ch???p ???nh', value: 'checking' },
        { text: 'Trung t??m vui ch??i', value: 'center' },
        { text: 'Vui ch??i v??? ????m', value: 'night' }
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.typeLocation.startsWith(value)
    },
    {
      key: '6',
      title: '?????a ch??? tr??n google map',
      dataIndex: 'locationLink',
      width: 300
    },
    {
      key: '7',
      title: 'M?? t??? ?????a ??i???m',
      render: params => (
        <Typography>{HTMLReactParser(params.description)}</Typography>
      ),
      width: 400
    },
    {
      key: '8',
      title: 'Kinh ?????',
      render: params => <Typography>{params.location.lng}</Typography>
    },
    {
      key: '9',
      title: 'V??? ?????',
      render: params => <Typography>{params.location.lat}</Typography>
    },
    {
      key: '10',
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

  const onAddStudent = () => {
    const randomNumber = parseInt(Math.random() * 1000)
    const newStudent = {
      id: randomNumber,
      ...formik.values
    }
    setDataSource(pre => {
      return [newStudent, ...pre]
    })
    setIsAdd(false)
  }

  const onDeleteStudent = record => {
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
  const onEditStudent = record => {
    setIsEditing(true)
    setEditingStudent({ ...record })
  }
  const resetEditing = () => {
    setIsEditing(false)
    setIsAdd(false)
    setEditingStudent(null)
  }

  const handleSubmit = () => {
    console.log(dataSource)
  }

  useEffect(() => {
    const data = {
      ...travels,
      image: newImage
    }
    setEditingStudent(data)
  }, [newImage])

  return (
    <DashBoard>
      <Button onClick={() => setIsAdd(true)}>Th??m tr???m xe bu??t m???i</Button>
      <Button onClick={handleSubmit}>X??c nh???n t???o m???i tuy???n</Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 1500, y: 600 }}
      />
      <Modal
        title="Th??m tr???m xe bu??t m???i"
        open={isAdd}
        okText="Th??m m???i"
        cancelText="H???y"
        onCancel={() => {
          resetEditing()
        }}
        onOk={() => onAddStudent()}
        width="1200px"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              id="title"
              name="title"
              type="text"
              label="T??n ?????a ??i???m"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title || Boolean(formik.errors.title)}
              helperText={formik.errors.title}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ minWidth: 200 }}>
              <InputLabel>Lo???i H??nh Du l???ch</InputLabel>
              <Select
                id="typeLocation"
                name="typeLocation"
                value={formik.values.typeLocation}
                onChange={formik.handleChange}
              >
                <MenuItem value={'discover'}>Kh??m ph??</MenuItem>
                <MenuItem value={'cultural'}>V??n h??a</MenuItem>
                <MenuItem value={'checking'}>Ch???p ???nh</MenuItem>
                <MenuItem value={'center'}>Trung t??m vui ch??i</MenuItem>
                <MenuItem value={'night'}>Vui ch??i v??? ????m</MenuItem>
              </Select>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="locationName"
              name="locationName"
              type="text"
              label="?????a ch???"
              value={formik.values.locationName}
              onChange={formik.handleChange}
              error={
                formik.touched.locationName ||
                Boolean(formik.errors.locationName)
              }
              helperText={formik.errors.locationName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="locationLink"
              name="locationLink"
              type="text"
              label="?????a ch??? tr??n google map"
              value={formik.values.locationLink}
              onChange={formik.handleChange}
              error={
                formik.touched.locationLink ||
                Boolean(formik.errors.locationLink)
              }
              helperText={formik.errors.locationLink}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>To??? ????? c???a ?????a ??i???m:</InputLabel>
            <TextField
              id="location.lng"
              name="location.lng"
              label="Kinh ?????"
              type="number"
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
              label="V?? ?????"
              type="number"
              value={formik.values.location.lat}
              onChange={formik.handleChange}
              error={
                formik.touched.location?.lat ||
                Boolean(formik.errors.location?.lat)
              }
              helperText={formik.errors.location?.lat}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>M?? t??? v??? ?????a ??i???m: </InputLabel>
            <TextareaAutosize
              style={{ width: 500, height: 200 }}
              id="description"
              name="description"
              type="number"
              value={formik.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description || Boolean(formik.errors.description)
              }
              helperText={formik.errors.description}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                padding: '5px 0 5px 0'
              }}
            >
              H??nh ???nh ?????a ??i???m
            </Typography>
            <Box>
              {newImage && (
                <img
                  style={{
                    width: '300px',
                    height: '300px',
                    border: '3px solid #333333',
                    boxShadow:
                      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                  }}
                  src={newImage}
                  alt={'test'}
                />
              )}
            </Box>
            <Box sx={{ padding: '20px 0 20px 0' }}>
              <Button
                variant="contained"
                component="label"
                sx={{ fontWeight: 'bold' }}
              >
                T???i h??nh ???nh l??n
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={convert2base64}
                />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Modal>

      <Modal
        title="S???a th??ng tin tr???m xe bu??t"
        open={isEditing}
        okText="L??u l???i"
        cancelText="H???y"
        width="1200px"
        onCancel={() => {
          resetEditing()
        }}
        onOk={() => {
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
        <Grid container spacing={2} columns={16}>
          <Grid
            item
            xs={8}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {editformik.values.image && (
              <img
                style={{
                  width: '300px',
                  height: '300px',
                  border: '3px solid #333333',
                  boxShadow:
                    '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                }}
                src={editformik.values.image}
                alt={editformik.values.image}
              />
            )}
            <Button
              variant="contained"
              component="label"
              sx={{ fontWeight: 'bold', width: 200 }}
            >
              T???i h??nh ???nh l??n
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={convert2base64}
              />
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Typography style={{ fontWeight: 'bold' }}>
                T??n ?????a ??i???m:
              </Typography>
              <TextField
                id="title"
                name="title"
                type="text"
                style={{ width: 300 }}
                value={editformik.values?.title}
                onChange={editformik.handleChange}
                error={
                  editformik.touched?.title || Boolean(editformik.errors?.title)
                }
                helperText={editformik.errors?.title}
              />
            </Box>
            <Box>
              <Typography style={{ fontWeight: 'bold' }}>?????a ch???:</Typography>
              <TextField
                id="locationName"
                name="locationName"
                type="text"
                style={{ width: 300 }}
                value={editformik.values.locationName}
                onChange={editformik.handleChange}
                error={
                  editformik.touched.locationName ||
                  Boolean(editformik.errors.locationName)
                }
                helperText={editformik.errors.locationName}
              />
            </Box>
            <Box>
              <Typography style={{ fontWeight: 'bold' }}>
                Lo???i H??nh Du l???ch
              </Typography>
              <Select
                id="typeLocation"
                name="typeLocation"
                value={editformik.values.typeLocation}
                onChange={editformik.handleChange}
              >
                <MenuItem value={'discover'}>Kh??m ph??</MenuItem>
                <MenuItem value={'cultural'}>V??n h??a</MenuItem>
                <MenuItem value={'checking'}>Ch???p ???nh</MenuItem>
                <MenuItem value={'center'}>Trung t??m vui ch??i</MenuItem>
                <MenuItem value={'night'}>Vui ch??i v??? ????m</MenuItem>
              </Select>
            </Box>
            <Box>
              <Typography style={{ fontWeight: 'bold' }}>
                ?????a ch??? tr??n google map
              </Typography>

              <TextField
                id="locationLink"
                name="locationLink"
                type="text"
                value={editformik.values.locationLink}
                onChange={editformik.handleChange}
                error={
                  editformik.touched.locationLink ||
                  Boolean(editformik.errors.locationLink)
                }
                helperText={editformik.errors.locationLink}
              />
            </Box>
            <Box>
              <Typography style={{ fontWeight: 'bold' }}>
                M?? t??? v??? ?????a ??i???m:
              </Typography>
              <TextareaAutosize
                id="description"
                name="description"
                type="text"
                style={{ width: 500, height: 200 }}
                value={editformik.values.description}
                onChange={editformik.handleChange}
                error={
                  editformik.touched.description ||
                  Boolean(editformik.errors.description)
                }
                helperText={editformik.errors.description}
              />
            </Box>
            <Box>
              <Typography style={{ fontWeight: 'bold' }}>
                To??? ????? ?????a ??i???m:
              </Typography>
              <Box>
                <Typography style={{ fontWeight: 'bold' }}>Kinh ?????:</Typography>
                <TextField
                  id="location.lng"
                  name="location.lng"
                  type="number"
                  value={editformik.values.location.lng}
                  onChange={editformik.handleChange}
                  error={
                    editformik.touched.location?.lng ||
                    Boolean(editformik.errors.location?.lng)
                  }
                  helperText={editformik.errors.location?.lng}
                />
                <Typography style={{ fontWeight: 'bold' }}>V?? ?????:</Typography>
                <TextField
                  id="location.lat"
                  name="location.lat"
                  type="number"
                  value={editformik.values.location.lat}
                  onChange={editformik.handleChange}
                  error={
                    editformik.touched.location?.lat ||
                    Boolean(editformik.errors.location?.lat)
                  }
                  helperText={editformik.errors.location?.lat}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Modal>
    </DashBoard>
  )
}

export default Test
