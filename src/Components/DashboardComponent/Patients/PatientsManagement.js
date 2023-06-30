import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Skeleton from '@mui/material/Skeleton'
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'

import CheckLocation from '../CheckLocation'
import ManagementTable from '../../ManagementTable/ManagementTable'
import { useExternalApi as useExternalApiAdmin } from '../../../Api/Admin/AdminResponse'
import { useExternalApi as useExternalApiMedic } from '../../../Api/Medic/MedicResponse'
import PatientRegisterForm from '../../InformationProfile/PatientRegisterForm'

export default function PatientsManagement (props) {
  const { type } = props
  const nav = useNavigate()
  const [response, setResponse] = useState({})
  const [isOpenPatient, setIsOpenPatient] = useState(false)
  const [reloadInfo, setReloadInfo] = useState(false)
  const { getAllPatients: getAllPatientsAsAdmin } = useExternalApiAdmin()
  const { getAllPatients: getAllPatientsAsMedic } = useExternalApiMedic()

  useEffect(() => {
    if (CheckLocation()) {
      nav('/')
    }
  }, [])

  useEffect(() => {
    console.log('Recargando')
    if (type === 'Admin') {
      getAllPatientsAsAdmin(setResponse, localStorage.getItem('token'))
    } else {
      getAllPatientsAsMedic(setResponse, localStorage.getItem('token'))
    }
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
              response={response}
              setResponse={setResponse}
              title='Tabla de Pacientes'
              includeList={[
                'Documento', 'Nombre', 'Apellido', 'Ciudad',
                'Dirección', 'Teléfono', 'Sangre', 'Nacimiento',
                'Estimación', type === 'Admin' ? 'Médico' : undefined, 'Eliminar', 'Actualizar']}
              setIsOpen={setIsOpenPatient}
              setReloadInfo={setReloadInfo}
              reloadInfo={reloadInfo}
            />
          }
        </Box>
        <Dialog
          onClose={() => setIsOpenPatient(false)}
          open={isOpenPatient}
        >
          <PatientRegisterForm />
        </Dialog>
      </Grid>
    </Fade>
  )
}
