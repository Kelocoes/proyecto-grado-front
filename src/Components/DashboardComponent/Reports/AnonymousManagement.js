import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Skeleton from '@mui/material/Skeleton'

import AnonymousEstimationTable from '../../EstimationTable/AnonymousEstimationTable'
import CheckLocation from '../../../Utils/CheckLocation'
import GetSeverity from '../../../Utils/GetSeveirty'
import { useExternalApi } from '../../../Api/Results/ResultsResponse'

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function AnonymousManagement (props) {
  const nav = useNavigate()
  const [response, setResponse] = useState({})
  const [reloadInfo, setReloadInfo] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('info')
  const { getAnonymousEstimations } = useExternalApi()

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
    if (CheckLocation()) {
      nav('/')
    }
  }, [])

  useEffect(() => {
    if (JSON.stringify(response) !== '{}') {
      GetSeverity(response.status, setSeverity)
      setMessage(response.data.detail)
      setOpenSnack(true)
    }
  }, [response])

  useEffect(() => {
    async function fetchData () {
      try {
        await getAnonymousEstimations(localStorage.getItem('token'), setResponse)
        setOpenSnack(true)
        GetSeverity(response.status, setSeverity)
        setMessage(response.detail)
      } catch (error) {
        errorHandler('error', 'Error al cargar la información')
      }
    }
    fetchData()
  }, [reloadInfo])

  return (
    <Fade in={true}>
      <Grid container justifyContent='center'>
        <Box
          sx={{
            maxWidth: 'lg',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '5%',
            marginX: '10%'
          }}
        >
          <Typography
            variant="h4"
            sx={{
              marginBottom: '2%',
              textAlign: 'center'
            }}
          >
            Tabla de estimaciones anónimas
          </Typography>
          {JSON.stringify(response) === '{}' &&
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
          {JSON.stringify(response) !== '{}' &&
            <AnonymousEstimationTable
              response={response.responseAsArray}
              title='Estimaciones anónimas'
              setReloadInfo={setReloadInfo}
              reloadInfo={reloadInfo}
            />
          }
        </Box>
        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Grid>
    </Fade>
  )
}
