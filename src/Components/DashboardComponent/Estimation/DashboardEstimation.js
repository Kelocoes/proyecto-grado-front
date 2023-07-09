import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import EstimationManagement from '../../EstimationTable/EstimationTable'
import CheckLocation from '../../../Utils/CheckLocation'
import GetSeverity from '../../../Utils/GetSeveirty'
import { useExternalApi } from '../../../Api/Results/ResultsResponse'
import FormEstimation from '../../EstimationComponent/FormEstimation'

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function DashboardEstimation (props) {
  const nav = useNavigate()
  const [response, setResponse] = useState({})
  const [patientId, setPatientId] = useState(null)
  const [isOpenRegisterEstimation, setIsOpenRegisterEstimation] = useState(false)
  const [reloadInfo, setReloadInfo] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('info')
  const { getEstimationByPatient } = useExternalApi()

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

  const onSubmit = async () => {
    try {
      if (patientId !== null) {
        setIsLoading(true)
        await getEstimationByPatient(patientId, localStorage.getItem('token'), setResponse)
        setOpenSnack(true)
        GetSeverity(response.status, setSeverity)
        setMessage(response.detail)
      }
    } catch (error) {
      errorHandler('error', 'Error al cargar la información')
    }
  }

  useEffect(() => {
    if (CheckLocation()) {
      nav('/')
    }
  }, [])

  useEffect(() => {
    if (JSON.stringify(response) !== '{}') {
      setIsLoading(false)
      GetSeverity(response.status, setSeverity)
      setMessage(response.data.detail)
      setOpenSnack(true)
    }
  }, [response])

  useEffect(() => {
    async function fetchData () {
      try {
        if (patientId !== null) {
          setIsLoading(true)
          await getEstimationByPatient(patientId, localStorage.getItem('token'), setResponse)
          setOpenSnack(true)
          GetSeverity(response.status, setSeverity)
          setMessage(response.detail)
        }
      } catch (error) {
        errorHandler('error', 'Error al cargar la información')
      }
    }
    fetchData()
  }, [reloadInfo])

  useEffect(() => {
    async function fetchData () {
      try {
        if (patientId !== null) {
          await getEstimationByPatient(patientId, localStorage.getItem('token'), setResponse)
          setOpenSnack(true)
          GetSeverity(response.status, setSeverity)
          setMessage(response.detail)
        }
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
            Estimaciones de riesgo cardiovascular
          </Typography>
          <TextField sx={{ marginBottom: 1, width: '30ch' }}
            label="Identificación del paciente"
            onChange={(event) => setPatientId(event.target.value)}
          />
          <Button variant="contained" onClick={onSubmit}sx={{ marginBottom: 1 }}>
          {isLoading &&
            <CircularProgress color="inherit" size={15} sx={{ marginRight: 1 }} />}
            Enviar
          </Button>
          <EstimationManagement
            response={response.responseAsArray}
            title='Tabla de Estimaciones'
            setIsOpenRegister={setIsOpenRegisterEstimation}
            setReloadInfo={setReloadInfo}
            reloadInfo={reloadInfo}
          />
        </Box>
        <Dialog
          onClose={() => { setIsOpenRegisterEstimation(false); setReloadInfo(!reloadInfo) }}
          open={isOpenRegisterEstimation}
          maxWidth= 'md'
        >
          <FormEstimation type="register" />
        </Dialog>
        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Grid>
    </Fade>
  )
}
