import React, { useState, useEffect } from 'react'
import { Marker, Popup } from 'react-map-gl'
import busStop from 'images/icon_busstop.png'
import { useSelector } from 'react-redux'
import { searchTextSelector } from 'redux/selectors'
import { locationData } from 'actions/initialData/locationData'
import './MarkerBusRouter.scss'

const MarkerBusRoute = () => {
  const [markerLocation, setMarkerLocation] = useState([])

  const searchRoute = useSelector(searchTextSelector)
  useEffect(() => {
    const getRoutesCheckBox = searchRoute
      .filter(i => i.isChecked)
      .map(i => i.nameBusRouter)
    const markerLocation = locationData
      .filter(i => {
        return getRoutesCheckBox.indexOf(i.nameBusRouter) !== -1
      })
      .filter(i => i.directionRoute === 'turn')
      .map(i => i.route)
    setMarkerLocation(markerLocation)
    // validation route
    // console.log(markerLocation.map(i =>
    //   i.every(i =>typeof(i.name) === 'string')))
  }, [searchRoute])

  const [showPopup, setShowPopup] = useState(false)

  const mouseEnter = e => {
    e.preventDefault()
    setShowPopup(true)
  }

  const mouseLeave = e => {
    e.preventDefault()
    setShowPopup(false)
  }

  return (
    <div className="marker-bus-stop">
      {markerLocation.map(i =>
        i.map(i => (
          <Marker
            key={i.id}
            latitude={i.location.lat}
            longitude={i.location.lng}
            anchor="bottom"
          >
            <img
              style={{ height: 45, width: 30, cursor: 'pointer' }}
              src={busStop}
              alt="marker"
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseLeave}
            />
            {showPopup && (
              <Popup
                className="popup-form"
                key={i.id}
                latitude={i.location.lat}
                longitude={i.location.lng}
                anchor="top"
                closeOnClick={false}
                closeButton={false}
              >
                {i.name}
              </Popup>
            )}
          </Marker>
        ))
      )}
    </div>
  )
}

export default MarkerBusRoute
