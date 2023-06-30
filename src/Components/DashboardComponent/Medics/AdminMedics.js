import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Skeleton from '@mui/material/Skeleton'
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import CheckLocation from '../CheckLocation'
import ManagementTable from '../../ManagementTable/ManagementTable'
import { useExternalApi } from '../../../Api/Admin/AdminResponse'

export default function AdminPatients () {
  const nav = useNavigate()
  const [response, setResponse] = useState({})
  const { getAllMedics } = useExternalApi()

  useEffect(() => {
    if (CheckLocation()) {
      nav('/')
    } else {
      getAllMedics(setResponse, localStorage.getItem('token'))
    }
  }, [])

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
              response={response}
              setResponse={setResponse}
              title='Tabla de Médicos'
              includeList={[
                'key', 'Tipo', 'Documento',
                'Nombre', 'Apellido', 'Ciudad',
                'Teléfono', 'Correo', 'Activo', 'Actualizar']}
            />
          }
        </Box>
      </Grid>
    </Fade>
  )
}
