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
import { useExternalApi as useExternalApiMedic } from '../../../Api/Medic/MedicResponse'
import { useExternalApi as useExternalApiAdmin } from '../../../Api/Admin/AdminResponse'
import { useExternalApi as useExternalApiAccount } from '../../../Api/Account/AccountResponse'
import InformationProfile from '../../InformationProfile/InformationProfile'
import GetSeverity from '../../../Utils/GetSeveirty'

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function AdminPatients () {
  const nav = useNavigate()
  const [response, setResponse] = useState({})
  const [responseMessage, setResponseMessage] = useState({})
  const [isOpenRegisterMedic, setIsOpenRegisterMedic] = useState(false)
  const [reloadInfo, setReloadInfo] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('info')
  const { getAllMedics } = useExternalApiMedic()
  const { updateMedicAsOther } = useExternalApiAdmin()
  const { changeStatus } = useExternalApiAccount()

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

  const updateFunction = async (data) => {
    try {
      await updateMedicAsOther(data, localStorage.getItem('token'), setResponseMessage)
    } catch (error) {
      errorHandler('error', 'Error al actualizar el médico')
    }
  }

  const activateFunction = async (id, data) => {
    try {
      await changeStatus(id, data !== 'true', localStorage.getItem('token'), setResponseMessage)
    } catch (error) {
      errorHandler('error', 'Error al actualizar el médico')
    }
  }

  useEffect(() => {
    if (CheckLocation()) {
      nav('/')
    }
  }, [])

  useEffect(() => {
    if (JSON.stringify(response) !== '{}') {
      setOpenSnack(true)
      GetSeverity(response.status, setSeverity)
      setMessage(response.data.detail)
    }
  }, [response])

  useEffect(() => {
    if (JSON.stringify(responseMessage) !== '{}') {
      setResponse({})
      setOpenSnack(true)
      GetSeverity(responseMessage.status, setSeverity)
      setMessage(responseMessage.data.detail)
      setReloadInfo(!reloadInfo)
    }
  }, [responseMessage])

  useEffect(() => {
    async function fetchData () {
      try {
        await getAllMedics(setResponse, localStorage.getItem('token'))
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
            Gestión de médicos
          </Typography>
          {JSON.stringify(response) === '{}' &&
            <Skeleton
              animation="wave"
              variant="rounded"
              width="1300px"
              height="400px"
              sx={{
                boxShadow: 20
              }}
            />
          }
          {JSON.stringify(response) !== '{}' &&
            <ManagementTable
              response={response.responseAsArray}
              title='Tabla de Médicos'
              includeList={[
                'key', 'Tipo', 'Documento',
                'Nombre', 'Apellido', 'Ciudad',
                'Teléfono', 'Correo', 'Activo', 'Actualizar']}
              setIsOpenRegister={setIsOpenRegisterMedic}
              setReloadInfo={setReloadInfo}
              reloadInfo={reloadInfo}
              updateFunction={updateFunction}
              activateFunction={activateFunction}
            />
          }
        </Box>
        <Dialog
          onClose={() => { setIsOpenRegisterMedic(false); setReloadInfo(!reloadInfo) }}
          open={isOpenRegisterMedic}
        >
          <InformationProfile method="CREATE" toWho={'other'}/>
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
