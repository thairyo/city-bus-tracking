import React, { useCallback, useEffect, useState, useRef } from 'react'
import Map, {
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  Marker
} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import PolylineBusRoutes from '../components/PolylineBusRoutes/PolylineBusRoutes'
import MarkerBusRoutes from 'components/MarkerBusRoutes/MarkerBusRoutes'
import HomeSidebar from 'components/HomeSidebar/HomeSidebar'
import MarkerTravelLocation from 'components/BusRoutes/MarkerTravelLocation'
import { useDispatch, useSelector } from 'react-redux'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import { REACT_APP_MAPBOX_KEY } from 'mapbox/_consts'
import { useBusStop } from 'hooks/useBusStop'
import { useTravel } from 'hooks/useTravel'
import { setUpdateLocation } from 'redux/slices/routes'

export default function Home() {
  const [viewport, setViewport] = useState({
    latitude: 16.06045710530602,
    longitude: 108.2097851153426,
    zoom: 14,
    customAttribution: 'buisonthai'
  })
  const _onViewportChange = e => setViewport(e.viewport)
  const data = {
    positionOptions: {
      enableHighAccuracy: true
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
  }

  const busStop = useBusStop()
  const travel = useTravel()

  // Get id bus stop in all bus stop and move in the location on map
  const getIdBusStop = useSelector(state => state.routes.idBusStop)
  useEffect(() => {
    const busstopFilterById = busStop
      .filter(busstop => busstop.id === getIdBusStop)
      .map(busstop => {
        return {
          latitude: busstop.location.lat,
          longitude: busstop.location.lng,
          zoom: 16
        }
      })[0]
    setViewport(busstopFilterById)
  }, [getIdBusStop, busStop])

  // Get id location travel in all information travel and move in the location on map
  const getIdTravelLocation = useSelector(state => state.routes.idTravel)
  useEffect(() => {
    const locationTravelFilterById = travel
      .filter(travel => travel.id === getIdTravelLocation)
      .map(travel => {
        return {
          latitude: travel.location.lat,
          longitude: travel.location.lng,
          zoom: 16
        }
      })[0]
    setViewport(locationTravelFilterById)
  }, [getIdTravelLocation, travel])

  // Get location in input search and flyTo in the location on map
  const getLocationByInput = useSelector(state => state.routes.direction)
  useEffect(() => {
    if (getLocationByInput?.location[0]) {
      mapRef.current.flyTo({
        center: [getLocationByInput.location[0], getLocationByInput.location[1]]
      })
    }
  }, [getLocationByInput])

  const mapRef = useRef(null)
  const mapRefCallback = useCallback(ref => {
    if (ref !== null) {
      //Set the actual ref we use elsewhere
      mapRef.current = ref
      const map = ref

      //Add language control that updates map text i18n based on browser preferences
      const language = new MapboxLanguage()
      map.addControl(language)
    }
  }, [])

  const dispatch = useDispatch()
  // console.log(useSelector(state => state.routes.location))
  return (
    <Map
      {...viewport}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onMove={_onViewportChange}
      mapboxAccessToken={REACT_APP_MAPBOX_KEY}
      ref={mapRefCallback}
    >
      <HomeSidebar />
      <PolylineBusRoutes />
      <MarkerBusRoutes />

      <MarkerTravelLocation />
      <NavigationControl position="bottom-right" />
      <FullscreenControl position="bottom-right" />
      {/* <Marker
        latitude={16}
        longitude={108}
        draggable
        onDrag={e => console.log(e.lngLat)}
      /> */}
      <GeolocateControl
        data={data}
        onGeolocate={e =>
          dispatch(
            setUpdateLocation({
              lng: e.coords.longitude,
              lat: e.coords.latitude
            })
          )
        }
        position="bottom-right"
      />
    </Map>
  )
}
