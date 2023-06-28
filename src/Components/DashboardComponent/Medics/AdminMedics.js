import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Skeleton from '@mui/material/Skeleton'
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'

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

  if (JSON.stringify(response) === '{}') {
    return (
      <Fade in={true}>
        <Grid container justifyContent='center'>
          <Skeleton
            animation="wave"
            variant="rounded"
            width="1500px"
            height="600px"
            sx={{
              marginY: 5,
              boxShadow: 20,
              marginTop: '5%',
              marginX: '10%'
            }}
          />
        </Grid>
      </Fade>
    )
  }

  return (
    <ManagementTable response={response} type='Medicos' />
  )
}
