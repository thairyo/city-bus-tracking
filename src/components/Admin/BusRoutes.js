import React from 'react'
import { List, Datagrid, TextField } from 'react-admin'

const BusRoutes = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <TextField source="codeBusRoute" />
        <TextField source="nameRoute" />
        <TextField source="directionRoute" />
        <TextField source="drivingJourney" />
        <TextField source="lineDistance" />
        <TextField source="operatingTime" />
        <TextField source="colorRoute" />
      </Datagrid>
    </List>
  )
}

export default BusRoutes
