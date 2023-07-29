import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Skeleton from '@mui/material/Skeleton'

import TrainingTable from '../../EstimationTable/TrainingTable'
import CheckLocation from '../../../Utils/CheckLocation'
import GetSeverity from '../../../Utils/GetSeveirty'
import { useExternalApi } from '../../../Api/Results/ResultsResponse'

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function TrainingManagement (props) {
  const nav = useNavigate()
  const [response, setResponse] = useState({})
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('info')
  const [reloadInfo, setReloadInfo] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)
  const { getTrainingReport } = useExternalApi()

  // Action when closing snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnack(false)
  }

  // Error handler
  const errorHandler = (type, message) => {
    setSeverity(type)
    setMessage(message)
    setOpenSnack(true)
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
        await getTrainingReport(localStorage.getItem('token'), setResponse)
        setMessage(response.detail)
        GetSeverity(response.status, setSeverity)
        setOpenSnack(true)
      } catch (error) {
        errorHandler('error', 'Error al cargar los resultados anónimos')
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
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '5%',
            marginX: '10%',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              marginBottom: '2%',
              textAlign: 'center'
            }}
          >
            Tabla para entrenamiento
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
            <TrainingTable
              response={response.responseAsArray}
              title='Datos de entrenamiento'
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
