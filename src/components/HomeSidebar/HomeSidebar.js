import React, { useState } from 'react'
import { Drawer, IconButton, Typography, Box, Tab, styled } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import BusRoutes from 'components/BusRoutes/BusRoutes'
import FindRoutes from 'components/FindRoutes/FindRoutes'
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  position: 'relative',
  backgroundColor: '#3597E4',
  paddingLeft: '1rem',
  ...theme.mixins.toolbar
}))

const HomeSidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [tabValue, setTabValue] = useState('1')

  const handleChangeTab = (e, newTabValue) => {
    setTabValue(newTabValue)
  }

  const toggleOpenSidebar = newOpen => () => {
    setIsOpen(newOpen)
  }

  return (
    <div className="home-sidebar">
      <Box
        sx={{
          backgroundColor: '#3597e4',
          width: '3rem',
          height: '3.5rem',
          position: 'absolute',
          borderTopRightRadius: '0.3rem',
          borderBottomRightRadius: '0.3rem'
        }}
      >
        <IconButton onClick={toggleOpenSidebar(true)}>
          <ArrowRightOutlinedIcon fontSize="large" sx={{ color: '#fff' }} />
        </IconButton>
      </Box>
      <Drawer variant="persistent" hideBackdrop={true} open={isOpen}>
        <DrawerHeader>
          <Typography style={{ fontWeight: '600', color: '#fff' }}>
            Hệ thống xe buýt Đà Nẵng
          </Typography>
          <IconButton onClick={toggleOpenSidebar(false)}>
            <ArrowLeftOutlinedIcon fontSize="large" sx={{ color: '#fff' }} />
          </IconButton>
        </DrawerHeader>
        <Box
          sx={{
            width: 400,
            height: '100%',
            p: 3,
            overflow: 'hidden'
          }}
        >
          <Box
            style={{
              width: '100%',
              color: '#3597E4',
              backgroundColor: 'inherit',
              fontSize: '1.5rem'
            }}
          >
            <TabContext value={tabValue}>
              <Box>
                <TabList onChange={handleChangeTab} aria-label="lab">
                  <Tab
                    style={{
                      width: '50%',
                      fontSize: '16px',
                      fontWeight: 600
                    }}
                    label="Tra cứu"
                    value="1"
                  />
                  <Tab
                    style={{
                      width: '50%',
                      fontSize: '16px',
                      fontWeight: 600
                    }}
                    label="Tìm tuyến"
                    value="2"
                  />
                </TabList>
              </Box>
              <Box>
                <TabPanel style={{ padding: '12px 0px 10px 0px' }} value="1">
                  <BusRoutes />
                </TabPanel>
                <TabPanel style={{ padding: '12px 0px 10px 0px' }} value="2">
                  <FindRoutes />
                </TabPanel>
              </Box>
            </TabContext>
          </Box>
        </Box>
      </Drawer>
    </div>
  )
}

export default HomeSidebar
