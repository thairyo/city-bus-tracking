import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useBusStop } from 'hooks/useBusStop'
import { useBusRoutes } from 'hooks/useBusRoutes'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useTimeBusStart } from 'hooks/useTimeBusStart'
import HTMLReactParser from 'html-react-parser'
import moment from 'moment'
import DashBoard from '../DashBoard'
import { useTravel } from 'hooks/useTravel'

function Row(props) {
  const { row } = props
  const [open, setOpen] = useState(false)
  const [openBusRoute, setOpenBusRoute] = useState(false)
  const [openTime, setOpenTime] = useState(false)
  const [codeRoute, setCodeRoute] = useState('')
  const [direction, setDirection] = useState('')
  const handleClick = () => {
    setCodeRoute(row.codeBusRoute)
    setDirection(row.directionRoute)
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell onClick={handleClick}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.codeBusRoute}</TableCell>
        <TableCell align="left">{row.nameRoute}</TableCell>
        <TableCell align="left">{row.directionRoute}</TableCell>
        <TableCell align="left">
          {HTMLReactParser(row.drivingJourney)}
        </TableCell>
        <TableCell align="left">{row.lineDistance}</TableCell>
        <TableCell align="left">{row.operatingTime}</TableCell>
        <TableCell align="left">{row.colorRoute}</TableCell>
        <TableCell align="left">
          {moment(row.createdAt).format('YYYY-MM-DD HH:MM:SS')}
        </TableCell>
        <TableCell align="left">
          <Link to={'/dashboard/busroute/' + row.id}>
            <Button>Ch???nh s???a</Button>
          </Link>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          align="left"
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Tr???m xe bu??t c???a tuy???n
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpenBusRoute(!openBusRoute)}
                >
                  {openBusRoute ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </Typography>
              {openBusRoute && (
                <Table size="medium" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">T??n tr???m xe bu??t</TableCell>
                      <TableCell align="left">Kinh ?????</TableCell>
                      <TableCell align="left">V??? ?????</TableCell>
                      <TableCell align="left">
                        Th???i gian di chuy???n gi???a 2 tr???m
                      </TableCell>
                      <TableCell>?????a ??i???m du l???ch ??? g???n tr???m</TableCell>
                      <TableCell align="left">Th???i gian t???o</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.busstops
                      .filter(
                        route =>
                          route.codeBusRoute === codeRoute &&
                          route.directionRoute === direction
                      )
                      .map(busStops => (
                        <TableRow key={busStops.id}>
                          <TableCell align="left">
                            {busStops.nameBusStop}
                          </TableCell>
                          <TableCell align="left">
                            {busStops.location.lng}
                          </TableCell>
                          <TableCell align="left">
                            {busStops.location.lat}
                          </TableCell>
                          <TableCell align="left">
                            {busStops.travelTime} ph??t
                          </TableCell>
                          <TableCell align="left">
                            {busStops.travelNear}
                          </TableCell>
                          <TableCell align="left">
                            {moment(busStops.createdAt).format(
                              'YYYY-MM-DD HH:MM:SS'
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </Box>
          </Collapse>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Th???i gian xe bu??t ch???y
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpenTime(!openTime)}
                >
                  {openTime ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </Typography>
              {openTime && (
                <Table size="medium" aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      {row.timeBusStart
                        .filter(
                          route =>
                            route.codeBusRoute === codeRoute &&
                            route.directionRoute === direction
                        )[0]
                        ?.startingTime.filter(
                          (t, index, arr) => index < arr.length / 2
                        )
                        .map(time => (
                          <TableCell>{time}</TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                      {row.timeBusStart
                        .filter(
                          route =>
                            route.codeBusRoute === codeRoute &&
                            route.directionRoute === direction
                        )[0]
                        ?.startingTime.filter(
                          (t, index, arr) => index >= arr.length / 2
                        )
                        .map(time => (
                          <TableCell>{time}</TableCell>
                        ))}
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

const BusRoutes = () => {
  const navigate = useNavigate()

  const busstops = useBusStop()
  const busroutes = useBusRoutes()
  const timeBusStart = useTimeBusStart()
  const travels = useTravel()
  const rows = busroutes.map(route => ({
    ...route,
    busstops: busstops,
    timeBusStart: timeBusStart,
    travels: travels
  }))

  return (
    <DashBoard>
      <Typography
        style={{ fontSize: '20px', fontWeight: 'bold', padding: '20px' }}
      >
        Th??ng tin v??? c??c tuy???n xe bu??t
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="left" />
              <TableCell align="left">M?? s??? tuy???n</TableCell>
              <TableCell align="left">T??n tuy???n</TableCell>
              <TableCell align="left">Chi???u c???a tuy???n</TableCell>
              <TableCell align="left">M?? t??? h??nh tr??nh</TableCell>
              <TableCell align="left">????? d??i c???a tuy???n</TableCell>
              <TableCell align="left">Th???i gian tuy???n ho???t ?????ng</TableCell>
              <TableCell align="left">M??u c???a tuy???n</TableCell>
              <TableCell align="left">Th???i gian t???o</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => navigate('/dashboard/busroute/create')}>
        T???o tuy???n xe bu??t
      </Button>
    </DashBoard>
  )
}

export default BusRoutes
