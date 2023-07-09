import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import CheckLocation from '../../../Utils/CheckLocation'
import GetSeverity from '../../../Utils/GetSeveirty'
import { useExternalApi } from '../../../Api/Results/ResultsResponse'

import MultiplePie from './Charts/MultiplePie'
import AvgTable from './Charts/AvgTable'

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function GeneralReports (props) {
  const { type } = props
  const nav = useNavigate()
  const [responseCategory, setResponseCategory] = useState({})
  const [responseAvg, setResponseAvg] = useState({})
  const [openSnack, setOpenSnack] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('info')
  const { getResultsByCategory, getResultsAvg } = useExternalApi()

  // Error handler
  const errorHandler = (type, message) => {
    setSeverity(type)
    setOpenSnack(true)
    setMessage(message)
  }

  // Action when closing snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnack(false)
  }

  useEffect(() => {
    async function fetchData () {
      if (CheckLocation()) {
        nav('/')
      } else {
        try {
          await getResultsByCategory(localStorage.getItem('token'), setResponseCategory)
          await getResultsAvg(localStorage.getItem('token'), setResponseAvg)
        } catch (error) {
          errorHandler('error', 'Error al cargar la información')
        }
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (JSON.stringify(responseCategory) !== '{}' &&
      JSON.stringify(responseAvg) !== '{}') {
      GetSeverity(responseCategory.status, setSeverity)
      setMessage(responseCategory.data.detail)
      setOpenSnack(true)
    }
  }, [responseCategory])

  return (
    <Fade in={true}>
      <Container maxWidth="xxl" sx={{ marginTop: 7 }}>
        <Box
          sx={{
            maxWidth: 'xl',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '5%',
            marginX: '10%'
          }}
        >
          {(JSON.stringify(responseCategory) === '{}' ||
            JSON.stringify(responseAvg) === '{}') &&

            <Skeleton
              animation="wave"
              variant="rounded"
              width="1500px"
              height="400px"
              sx={{
                boxShadow: 20
              }}
            />
          }
          {JSON.stringify(responseCategory) !== '{}' &&
            JSON.stringify(responseAvg) !== '{}' &&
            <Grid container justifyContent="center">
              <Grid item xs={12} md={7.5} >
                <Grid item xs={12} >
                  <Typography variant="h4" sx={{ textAlign: 'center' }}>
                    {type === 'Admin'
                      ? 'Estimaciones por mes'
                      : 'Puntajes de pacientes'
                    }
                  </Typography>
                  <Divider sx={{ marginX: '10%' }} />
                </Grid>
                <Grid item xs={12} sx={{ padding: 1 }}>
                  <Typography variant="h4" sx={{ textAlign: 'center' }}>
                    Promedios por severidad
                  </Typography>
                  <Divider sx={{ marginX: '10%', marginBottom: '1%' }} />
                  <AvgTable data={responseAvg.data.results}/>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4.5} >
                <Typography variant="h4" sx={{ textAlign: 'center' }}>
                  Estimaciones por categoría
                </Typography>
                <Divider sx={{ marginX: '10%' }} />
                <MultiplePie data={responseCategory.data.results}/>
              </Grid>
            </Grid>
          }
        </Box>
        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Container>
    </Fade>
  )
}
