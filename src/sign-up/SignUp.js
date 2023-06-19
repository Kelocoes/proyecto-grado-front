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
import Container from '@mui/material/Container'
import { useForm } from 'react-hook-form'
import CircularProgress from '@mui/material/CircularProgress'
import { useState, useEffect, useRef } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { useNavigate } from 'react-router'
import Reaptcha from 'reaptcha'
import { Link as LinkRouter } from 'react-router-dom'

import { useEnv } from '../context/env.context'
import { useExternalApi } from '../Api/Medic/MedicResponse'

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
  const { handleSubmit: getInfoRegister, register: registro } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState({})
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('info')
  const [openSnack, setOpenSnack] = useState(false)
  const [captchaToken, setCaptchaToken] = useState(null)
  const [captchaResponse, setCaptchaResponse] = useState(null)
  const [data, setData] = useState(null)
  const captchaRef = useRef(null)
  const { siteKey } = useEnv()
  const { createMedic, getCaptchaScore } = useExternalApi()
  const nav = useNavigate()
  const tipeId = [{ value: 'CC', label: 'CC' }]

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnack(false)
  }

  const getSeverity = (statusCode) => {
    if (statusCode === 200) {
      setSeverity('success')
    } else if (statusCode < 500) {
      setSeverity('warning')
    } else {
      setSeverity('error')
    }
  }

  const onSubmit = async (data) => {
    if (captchaToken) {
      // console.log(captchaToken)
      await getCaptchaScore(captchaToken, setCaptchaResponse)
      setData(data)
    }
  }

  const verify = () => {
    captchaRef.current.getResponse().then(res => {
      setCaptchaToken(res)
    })
  }

  useEffect(() => {
    async function fetchData () {
      if (captchaResponse && data) {
        if (captchaResponse.data.detail.success) {
          setOpenSnack(true)
          setSeverity('success')
          setMessage('Has pasado la prueba de captcha')
          data.city = transformarString(data.city)
          setIsLoading(true)
          await createMedic(data, setResponse)
        } else {
          setOpenSnack(true)
          setSeverity('warning')
          setMessage('No has pasado la prueba del captcha')
        }
      }
    }
    fetchData()
  }, [captchaResponse])

  useEffect(() => {
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
  }, [response])

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <Box sx={{ mt: 3 }}>
          <form onSubmit = {getInfoRegister(onSubmit)}>
            <Grid container spacing={2}>
            <Grid item xs={4} sm={3}>
                <TextField
                  required
                  variant = "outlined"
                  label= "Tipo"
                  select
                  fullWidth
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
                  autoFocus
                  type = "number"
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
                  autoFocus
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
                  type = "number"
                  autoComplete= "tel"
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
              <Grid item xs = {12} display = 'flex' justifyContent= 'center'>
                <Reaptcha
                  sitekey={siteKey}
                  ref={captchaRef}
                  onVerify={verify}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={getInfoRegister(onSubmit)}
            >
              {isLoading && <CircularProgress color="inherit" size = {15} sx = {{ mr: 1 }} />}
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component = {LinkRouter} to = {'/signin'} variant="body2">
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
    </Container>
  )
}
