import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Skeleton from '@mui/material/Skeleton'
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import MuiAlert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import CheckLocation from '../../../Utils/CheckLocation'
import ManagementTable from '../../ManagementTable/ManagementTable'
import { useExternalApi } from '../../../Api/Patient/PatientResponse'
import PatientForm from '../../InformationProfile/PatientForm'
import GetSeverity from '../../../Utils/GetSeveirty'

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function PatientsManagement (props) {
  const { type } = props
  const nav = useNavigate()
  const [response, setResponse] = useState({})
  const [responseMessage, setResponseMessage] = useState({})
  const [isOpenRegisterPatient, setIsOpenRegisterPatient] = useState(false)
  const [reloadInfo, setReloadInfo] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('info')
  const { getAllPatients, deletePatient, updatePatient } = useExternalApi()

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

  const deleteFunction = async (id) => {
    try {
      await deletePatient(id, localStorage.getItem('token'), setResponseMessage)
    } catch (error) {
      errorHandler('error', 'Error al eliminar el paciente')
    }
  }

  const updateFunction = async (data) => {
    try {
      await updatePatient(data, localStorage.getItem('token'), setResponseMessage)
    } catch (error) {
      errorHandler('error', 'Error al actualizar el paciente')
    }
  }

  useEffect(() => {
    if (CheckLocation()) {
      nav('/')
    }
  }, [])

  useEffect(() => {
    async function fetchData () {
      try {
        getAllPatients(setResponse, localStorage.getItem('token'), type)
      } catch (error) {
        errorHandler('error', 'Error al cargar la información')
      }
    }
    fetchData()
  }, [reloadInfo])

  useEffect(() => {
    if (JSON.stringify(response) !== '{}') {
      setOpenSnack(true)
      GetSeverity(response.status, setSeverity)
      setMessage(response.data.detail)
    }
  }, [response])

  useEffect(() => {
    if (JSON.stringify(responseMessage) !== '{}') {
      setOpenSnack(true)
      GetSeverity(responseMessage.status, setSeverity)
      setMessage(responseMessage.data.detail)
      setReloadInfo(!reloadInfo)
    }
  }, [responseMessage])

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
            Gestión de pacientes
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
            <ManagementTable
              response={response.responseAsArray}
              title='Tabla de Pacientes'
              includeList={[
                'Documento', 'Nombre', 'Apellido', 'Ciudad',
                'Dirección', 'Teléfono', 'Sangre', 'Nacimiento',
                'Estimación', type === 'Admin' ? 'Médico' : undefined, 'Eliminar', 'Actualizar']}
              setIsOpenRegister={setIsOpenRegisterPatient}
              setReloadInfo={setReloadInfo}
              reloadInfo={reloadInfo}
              deleteFunction={deleteFunction}
              updateFunction={updateFunction}
            />
          }
        </Box>
        <Dialog
          onClose={() => { setIsOpenRegisterPatient(false); setReloadInfo(!reloadInfo) }}
          open={isOpenRegisterPatient}
        >
          <PatientForm/>
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
