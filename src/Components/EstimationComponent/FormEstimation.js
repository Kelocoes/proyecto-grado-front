import * as React from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import Dialog from '@mui/material/Dialog'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

import { useExternalApi } from '../../Api/Results/ResultsResponse'
import GetSeverity from '../../Utils/GetSeveirty'

import TermsAndConditions from './TermsAndConditions'
import GraphEstimation from './GraphEstimation'

function CircularProgressWithLabel (props) {
  const valueCenter = props.value / 100

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Stack>
          <Typography variant="h3" component="div" color="text.secondary">
            {`${parseFloat(valueCenter.toFixed(3))}`}
          </Typography>
          <Typography variant="h6" component="div" color="text.secondary">
            {`${props.severity}`}
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function FormEstimation (props) {
  // PROPS
  const { type } = props

  // HOOKS

  // Form hook
  const { handleSubmit: getInfoPatientSubmit, register: registro } = useForm()

  // Api hook
  const { getEstimation } = useExternalApi()

  // States hook
  const [estimation, setEstimation] = useState(
    { data: { prediction: 0, severity: 'none', framingham: 0 } })
  const [isActive, setIsActive] = useState(false)
  const [open, setOpen] = useState(false)
  const [buttonGraph, setActiveButtonGraph] = useState(false)
  const [openGraph, setOpenGraph] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [snackSeverity, setSnackSeverity] = useState('info')
  const [openSnack, setOpenSnack] = useState(false)

  // CONSTANTS

  const title = 'Ingresa tus datos aquí'

  const yesno = [{ value: '1', label: 'Sí' }, { value: '0', label: 'No' }]

  const sex = [{ value: '1', label: 'Femenino' }, { value: '0', label: 'Masculino' }]

  const colorLevel = {
    Low: 'green',
    Medium: 'yellow',
    High: 'red'
  }

  const severity = {
    none: 'Ninguno',
    Low: 'Bajo',
    Medium: 'Leve',
    High: 'Alto'
  }

  // ARROW FUNCTIONS

  // Error handler
  const errorHandler = (type, message) => {
    setIsLoading(false)
    setSnackSeverity(type)
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
  const onSubmit = async data => {
    setIsLoading(true)
    try {
      await getEstimation(data,
        setEstimation,
        setActiveButtonGraph,
        type === 'register',
        localStorage.getItem('token'))
    } catch (error) {
      errorHandler('error', 'Ha ocurrido un error inesperado')
    }
  }

  // Action when pressing button for dialog
  const handleButtonClick = () => {
    setOpen(false)
  }

  // Action for checkbox button
  const handlePrivacyClick = () => {
    setIsActive(!isActive)
    setIsChecked(!isChecked)
  }

  // Action for terms and conditions
  const handleTermsClick = () => {
    setOpen(true)
  }

  // USE EFFECTS

  // Action to perform when estimation is updated
  useEffect(() => {
    if (JSON.stringify(estimation) !==
      JSON.stringify({ data: { prediction: 0, severity: 'none', framingham: 0 } })) {
      setIsLoading(false)
      setOpenSnack(true)
      GetSeverity(estimation.status, setSnackSeverity)
      setMessage(estimation.data.detail)
    }
  }, [estimation])

  return (
    <Card sx={{ boxShadow: 5, marginBottom: 3, marginTop: 2, overflow: 'auto' }}>
      <Grid container alignItems="center">
        <Grid item xs={12} md={7}>
          <CardContent >
            <Typography variant="h5" color="inherit" justifyContent="center" align="center">
              {title}
            </Typography>
          </CardContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CardContent sx={{ width: '500px' }}>
              <form onSubmit={getInfoPatientSubmit(onSubmit)}>
                <Grid container spacing={2} align="center">
                  {type === 'register' &&
                    <Grid item xs={12}>
                      <TextField required variant="outlined" label="Documento paciente"
                        type="number"
                        fullWidth
                        {...registro('patient_id', { valueAsNumber: true, required: true })}
                        inputProps={{
                          min: 0,
                          max: 150
                        }}
                      />
                    </Grid>
                  }
                  <Grid item xs={6}>
                    <TextField required variant="outlined" label="Edad" type="number" fullWidth
                      {...registro('age', { valueAsNumber: true, required: true })}
                      inputProps={{
                        min: 0,
                        max: 150
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField required variant="outlined" label="Sexo" select fullWidth
                      {...registro('sex', { required: true })}
                      defaultValue=''
                    >
                      {sex.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField required variant="outlined" label="Peso" type="number" fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start">kg</InputAdornment>
                      }}
                      inputProps={{
                        min: 0,
                        max: 100
                      }}
                      {...registro('weight', { valueAsNumber: true, required: true })}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField required variant="outlined" label="Estatura" type="number" fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start">cm</InputAdornment>
                      }}
                      inputProps={{
                        min: 0,
                        max: 300
                      }}
                      {...registro('height', { valueAsNumber: true, required: true })}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField required variant="outlined" label="Sistólica" type="number" fullWidth
                      {...registro('systolic', { valueAsNumber: true, required: true })}
                      inputProps={{
                        min: 0,
                        max: 300
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField required variant="outlined" label="Diastólica" type="number"
                      fullWidth
                      inputProps={{
                        min: 0,
                        max: 300
                      }}
                      {...registro('diastolic', { valueAsNumber: true, required: true })}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField required variant="outlined" label="Colesterol total" type="number"
                      fullWidth
                      {...registro('cholesterol', { valueAsNumber: true, required: true })}
                      inputProps={{
                        min: 0,
                        max: 500
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField required variant="outlined" label="HDL" type="number" fullWidth
                      {...registro('hdl', { valueAsNumber: true, required: true })}
                      inputProps={{
                        min: 0
                      }}

                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField required variant="outlined" label="LDL" type="number" fullWidth
                      {...registro('ldl', { valueAsNumber: true, required: true })}
                      inputProps={{
                        min: 0
                      }}

                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField required variant="outlined" label="Trigliceridos" type="number"
                      fullWidth
                      {...registro('triglycerides', { valueAsNumber: true, required: true })}
                      inputProps={{
                        min: 0
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField required variant="outlined" label="Fumas" select fullWidth
                      {...registro('smoking', { valueAsString: true, required: true })}
                      defaultValue=''
                    >
                      {yesno.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField required variant="outlined" label="Diabetes" select fullWidth
                      {...registro('diabetes', { required: true })}
                      defaultValue=''
                    >
                      {yesno.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField required variant="outlined" label="Antecedentes" select fullWidth
                      {...registro('background', { required: true })}
                      defaultValue=''
                    >
                      {yesno.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </form>
              <Grid container >
                <Grid item xs={12} sx={{ paddingBottom: 1 }}>
                  <Typography sx={{ paddingTop: 1 }}>
                    <Checkbox onClick={handlePrivacyClick} />
                    He leído y acepto la
                    {' '}
                    <Link component="button" onClick={handleTermsClick}>
                      política de privacidad.
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                  <Button
                    disabled={!isActive}
                    variant='contained'
                    onClick={getInfoPatientSubmit(onSubmit)}
                  >
                    {isLoading &&
                      <CircularProgress color="inherit" size={15} sx={{ marginRight: 1 }} />}
                    Generar estimación
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} textAlign="center" sx={{ paddingRight: { sx: 0, md: 10 } }} >
          <CardContent >
            <CircularProgressWithLabel
              variant="determinate"
              size={175}
              value={estimation.data.prediction * 100}
              style={{ color: colorLevel[estimation.data.severity] }}
              severity={severity[estimation.data.severity]} />
          </CardContent>
          <CardContent>
            <Button
              disabled={!buttonGraph}
              variant='contained'
              onClick={() => { setOpenGraph(true) }}
            >
              ¡Compárate!
            </Button>
          </CardContent>
          <CardContent >
            <CircularProgressWithLabel
              variant="determinate"
              size={175}
              value={estimation.data.framingham * 100}
              style={{ color: 'green' }}
              severity={'Framingham'} />
          </CardContent>
        </Grid>
      </Grid>
      <Dialog open={open}>
        <TermsAndConditions handleButtonClick={handleButtonClick} />
      </Dialog>
      <Dialog open={openGraph} maxWidth="xl" onClose={() => { setOpenGraph(false) }}>
        <Container sx={{ width: '1000px', height: '550px', overflow: 'auto' }}>
          <GraphEstimation estimation={estimation.data.prediction} />
          <Typography align="justify" sx={{ fontStyle: 'italic', pt: 1 }} >
            Este gráfico representa el conjunto de prueba que hizo parte de la selección
            del modelo de Redes Neuronales que es utilizado en esta aplicación. Esto
            te permitirá compararte frente a ellos para darte una idea de cuál es tu nivel
            de riesgo.
          </Typography>
        </Container>
      </Dialog>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackSeverity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Card>
  )
}
