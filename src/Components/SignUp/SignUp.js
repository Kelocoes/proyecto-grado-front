import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import CircularProgress from '@mui/material/CircularProgress'
import { useState, useEffect, useRef } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { useNavigate } from 'react-router'
import Reaptcha from 'reaptcha'
import { Link as LinkRouter } from 'react-router-dom'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'

import { useEnv } from '../../Context/EnvContext'
import { useExternalApi } from '../../Api/Medic/MedicResponse'

function Copyright () {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Universidad del Valle, Escuela de Ingeniería de Sistemas y Computación, '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

function transformarString (text) {
  let result = text.toLowerCase()
  result = result.charAt(0).toUpperCase() + result.slice(1)
  result = result.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return result
}

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function SignUp () {
  // HOOKS

  // Form hook
  const { handleSubmit: getInfoRegister, register: registro } = useForm()

  // Env hook
  const { siteKey } = useEnv()

  // Api hook
  const { createMedic, getCaptchaScore } = useExternalApi()

  // Navigation hook
  const nav = useNavigate()

  // Ref hook
  const captchaRef = useRef(null)

  // State hook
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [response, setResponse] = useState({})
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('info')
  const [openSnack, setOpenSnack] = useState(false)
  const [captchaToken, setCaptchaToken] = useState(null)
  const [captchaResponse, setCaptchaResponse] = useState(null)
  const [data, setData] = useState(null)

  // CONSTANTS

  const tipeId = [{ value: 'CC', label: 'CC' }]

  // ARROW FUNCTIONS

  // Error handler
  const errorHandler = () => {
    setIsLoading(false)
    setSeverity('error')
    setOpenSnack(true)
    setMessage('Ha ocurrido un error inesperado')
  }

  // Action when closing snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnack(false)
  }

  // Get severities using the status code
  const getSeverity = (statusCode) => {
    if (statusCode < 210) {
      setSeverity('success')
      setIsDisabled(true)
    } else if (statusCode < 500) {
      setSeverity('warning')
    } else {
      setSeverity('error')
    }
  }

  // Action when pressing the main button
  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      if (captchaToken) {
        // console.log(captchaToken)
        await getCaptchaScore(captchaToken, setCaptchaResponse)
        setData(data)
      } else {
        errorHandler()
      }
    } catch (error) {
      errorHandler()
    }
  }

  // Verify the captcha token
  const verify = () => {
    captchaRef.current.getResponse().then(res => {
      setCaptchaToken(res)
    })
  }

  // USE EFFECTS

  // Effect when captchaResponse state is updated
  useEffect(() => {
    async function fetchData () {
      try {
        if (captchaResponse && data) {
          if (captchaResponse.data.detail.success) {
            setOpenSnack(true)
            setSeverity('success')
            setMessage('Has pasado la prueba de captcha')
            data.city = transformarString(data.city)
            await createMedic(data, setResponse)
          } else {
            setOpenSnack(true)
            setSeverity('warning')
            setMessage('No has pasado la prueba del captcha')
          }
        }
      } catch (error) {
        errorHandler()
      }
    }
    fetchData()
  }, [captchaResponse])

  // Effect when response state is updated
  useEffect(() => {
    try {
      if (JSON.stringify(response) !== '{}') {
        getSeverity(response.status)
        setIsLoading(false)
        setOpenSnack(true)
        setMessage(response.data.detail)
        setTimeout(() => {
          if (response.status === 200) {
            localStorage.setItem('token', response.data.token)
            nav('/dashboard')
          }
        }, 2000)
      }
    } catch (error) {
      setIsLoading(false)
      setSeverity('error')
      setOpenSnack(true)
      setMessage('Ha ocurrido un error inesperado')
    }
  }, [response])

  return (
    <Grid container justifyContent='center'>
      <Card sx={{ marginY: 8, width: '550px', padding: 10, boxShadow: 20 }}>
        <Box
          sx={{
            marginBottom: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <IconButton component={LinkRouter} to={'/'}>
            <Avatar sx={{ margin: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
          </IconButton>
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
          <Box sx={{ marginTop: 3 }}>
            <form onSubmit={getInfoRegister(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={4} sm={3}>
                  <TextField
                    required
                    variant="outlined"
                    label="Tipo"
                    select
                    fullWidth
                    autoFocus
                    defaultValue=''
                    {...registro('id_type', { required: true })}
                  >
                    {tipeId.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <TextField
                    required
                    fullWidth
                    label="Identificación"
                    type="number"
                    {...registro('id', { required: true })}
                    inputProps={{
                      min: 0
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
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
                    autoComplete="family-name"
                    {...registro('last_name', { required: true })}
                    inputProps={{
                      maxLength: 100
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Telefono"
                    type="number"
                    autoComplete="tel"
                    {...registro('cellphone', { required: true })}
                    inputProps={{
                      min: 0,
                      maxLength: 20
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Correo electrónico"
                    autoComplete="email"
                    {...registro('email', { required: true })}
                    inputProps={{
                      maxLength: 254
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Usuario"
                    autoComplete="nickname"
                    {...registro('username', { required: true })}
                    inputProps={{
                      maxLength: 150
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Contraseña"
                    type="password"
                    autoComplete="new-password"
                    {...registro('password', { required: true })}
                    inputProps={{
                      maxLength: 128
                    }}
                  />
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='center'>
                  <Reaptcha
                    sitekey={siteKey}
                    ref={captchaRef}
                    onVerify={verify}
                  />
                </Grid>
              </Grid>
              <Button
                disabled={isDisabled}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ marginTop: 3, marginBottom: 2 }}
                onClick={getInfoRegister(onSubmit)}
              >
                {isLoading &&
                  <CircularProgress color="inherit" size={15} sx={{ marginRight: 1 }} />}
                Registrarse
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component={LinkRouter} to={'/signin'} variant="body2">
                    Ya tienes una cuenta? Ingresa
                  </Link>
                </Grid>
              </Grid>
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
  )
}
