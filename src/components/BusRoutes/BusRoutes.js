import React, { useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import FilterRoutes from './FilterRoutes'
import ListAllBusStop from './ListAllBusStop'
import './BusRoutes.scss'

const BusRouter = () => {
  const [tabValue, setTabValue] = useState('1')
  const handleChangeTab = (e, newTabValue) => {
    setTabValue(newTabValue)
  }

  return (
    <div className="sidebar-busroute">
      <TabContext value={tabValue}>
        <Box>
          <TabList
            onChange={handleChangeTab}
            aria-label="lab"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab
              style={{
                width: '50%',
                fontSize: '16px',
                fontWeight: 600
              }}
              label="Tuyến"
              value="1"
            />
            <Tab
              style={{
                width: '50%',
                fontSize: '16px',
                fontWeight: 600
              }}
              label="Trạm dừng"
              value="2"
            />
          </TabList>
        </Box>
        <Box>
          <TabPanel style={{ padding: '12px 0px 10px 0px' }} value="1">
            <FilterRoutes />
          </TabPanel>
          <TabPanel style={{ padding: '12px 0px 10px 0px' }} value="2">
            <ListAllBusStop />
          </TabPanel>
        </Box>
      </TabContext>
    </div>
  )
}

export default BusRouter
