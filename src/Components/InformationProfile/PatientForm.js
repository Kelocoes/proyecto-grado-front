import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import CircularProgress from '@mui/material/CircularProgress'
import { useState, useEffect } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import Fade from '@mui/material/Fade'

import { useExternalApi } from '../../Api/Patient/PatientResponse'
import Copyright from '../Copyright/Copyright'
import GetSeverity from '../../Utils/GetSeveirty'

function transformarString (text) {
  let result = text.toLowerCase()
  result = result.charAt(0).toUpperCase() + result.slice(1)
  result = result.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return result
}

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function PatientForm () {
  // PROPS

  // HOOKS

  // Form hook
  const { handleSubmit: getInfoPatientRegister, register: registro } = useForm()

  // Api hook
  const { createPatient } = useExternalApi()

  // States hook
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState({})
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('info')
  const [openSnack, setOpenSnack] = useState(false)

  // CONSTANTS

  const bloodTypes = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }]

  // ARROW FUNCTIONS

  // Error handler
  const errorHandler = (type, message) => {
    setIsLoading(false)
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

  // Action when pressing the main button
  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      data.city = transformarString(data.city)
      await createPatient(data, setResponse, localStorage.getItem('token'))
    } catch (error) {
      errorHandler('error', 'Ha ocurrido un error inesperado')
    }
  }

  // USE EFFECTS

  // Effect when response state is updated
  useEffect(() => {
    try {
      if (JSON.stringify(response) !== '{}') {
        GetSeverity(response.status, setSeverity)
        setIsLoading(false)
        setOpenSnack(true)
        setMessage(response.data.detail)
      }
    } catch (error) {
      errorHandler('error', 'Ha ocurrido un error inesperado')
    }
  }, [response])

  return (
    <Fade in={true}>
      <Grid container justifyContent='center'>
        <Card sx={{ width: '550px', paddingX: 10, boxShadow: 20, paddingY: 5 }}>
          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography component="h1" variant="h5">
              Registro de paciente
            </Typography>
            <Box sx={{ marginTop: 3 }}>
              <form onSubmit={getInfoPatientRegister(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={8} sm={12}>
                    <TextField
                      required
                      fullWidth
                      label="Identificación"
                      type="number"
                      {...registro('patient_id', { required: true })}
                      inputProps={{
                        min: 0
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Nombre"
                      {...registro('first_name', { required: true })}
                      inputProps={{
                        maxLength: 50
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Apellido"
                      {...registro('last_name', { required: true })}
                      inputProps={{
                        maxLength: 100
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Ciudad"
                      {...registro('city', { required: true })}
                      inputProps={{
                        maxLength: 50
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Telefono"
                      type="number"
                      {...registro('cellphone', { required: true })}
                      inputProps={{
                        min: 0,
                        maxLength: 20
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      fullWidth
                      label="Dirección"
                      {...registro('address', { required: true })}
                      inputProps={{
                        maxLength: 200
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Nacimiento"
                      type="date"
                      defaultValue="0001-01-01"
                      {...registro('birth_date', { required: true })}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      select
                      variant="outlined"
                      label=""
                      sx = {{ width: '10ch' }}
                      defaultValue="A+"
                      {...registro('blood_type', { required: true })}
                    >
                      {bloodTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>))}
                    </TextField>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ marginTop: 3, marginBottom: 2 }}
                  onClick={getInfoPatientRegister(onSubmit)}
                >
                  {isLoading &&
                    <CircularProgress color="inherit" size={15} sx={{ marginRight: 1 }} />}
                  Registrar paciente
                </Button>
              </form>
            </Box>
          </Box>
          <Copyright />
          <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
        </Card>
      </Grid>
    </Fade>
  )
}
