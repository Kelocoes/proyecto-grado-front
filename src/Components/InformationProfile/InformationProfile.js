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
import Fade from '@mui/material/Fade'

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

export default function SignUp (props) {
  // PROPS

  const { method } = props

  // HOOKS

  // Form hook
  const { handleSubmit: getInfoRegister, register: registro } = useForm()

  // Env hook
  const { siteKey } = useEnv()

  // Api hook
  const { createMedic, getCaptchaScore, getMedic, updateMedic } = useExternalApi()

  // Navigation hook
  const nav = useNavigate()

  // Ref hook
  const captchaRef = useRef(null)

  // State hook
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [response, setResponse] = useState({})
  const [profileData, setProfileData] = useState({})
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('info')
  const [openSnack, setOpenSnack] = useState(false)
  const [captchaToken, setCaptchaToken] = useState(null)
  const [captchaResponse, setCaptchaResponse] = useState(null)
  const [data, setData] = useState(null)

  // CONSTANTS

  const tipeId = [{ value: 'CC', label: 'CC' }]

  const dataByMethod = method === 'UPDATE'
    ? {
        showIcon: false,
        title: 'Tu perfil',
        buttonText: 'Actualizar',
        showLastLogin: true,
        defaultData: true,
        enableUser: false,
        enableEmail: false,
        showPassword: false,
        showCaptcha: false,
        showForgotPassword: true,
        showAlreadyAccount: false,
        showFooter: false,
        checkCaptcha: false
      }
    : {
        showIcon: true,
        title: 'Regístrate',
        buttonText: 'Registrarse',
        showLastLogin: false,
        defaultData: false,
        enableUser: true,
        enableEmail: true,
        showPassword: true,
        showCaptcha: true,
        showForgotPassword: false,
        showAlreadyAccount: true,
        showFooter: true,
        checkCaptcha: true
      }

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
      if (method === 'CREATE') {
        setIsDisabled(true)
      }
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
      if (dataByMethod.checkCaptcha) {
        if (captchaToken) {
          // console.log(captchaToken)
          await getCaptchaScore(captchaToken, setCaptchaResponse)
        } else {
          setIsLoading(false)
          setSeverity('warning')
          setOpenSnack(true)
          setMessage('Ha ocurrido un error con el catpcha')
        }
      } else {
        data.city = transformarString(data.city)
        await updateMedic(data, setResponse, localStorage.getItem('token'))
      }
      setData(data)
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
        if (method === 'CREATE') {
          setTimeout(() => {
            if (response.status === 200) {
              localStorage.setItem('token', response.data.token)
              nav('/dashboard/medic')
            }
          }, 2000)
        }
      }
    } catch (error) {
      errorHandler()
    }
  }, [response])

  // Effect when component is mounted
  useEffect(() => {
    async function fetchData () {
      try {
        if (method === 'UPDATE') {
          await getMedic(setProfileData, localStorage.getItem('token'))
        }
      } catch (error) {
        errorHandler()
      }
    }
    fetchData()
  }, [])

  if (method === 'UPDATE' && JSON.stringify(profileData) === '{}') {
    return (
      <Typography>
        Cargando...
      </Typography>
    )
  } else {
    return (
      <Fade in={true}>
        <Grid container justifyContent='center'>
          <Card sx={{ marginY: 5, width: '550px', paddingX: 10, boxShadow: 20, paddingY: 5 }}>
            <Box
              sx={{
                marginBottom: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {dataByMethod.showIcon &&
                <IconButton component={LinkRouter} to={'/'}>
                  <Avatar sx={{ margin: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                </IconButton>
              }
              <Typography component="h1" variant="h5">
                {dataByMethod.title}
              </Typography>
              {dataByMethod.showLastLogin &&
                <Typography variant="body2" paddingTop={1}>
                  Último inicio de sesión:
                </Typography>
              }
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
                        defaultValue={dataByMethod.defaultData ? profileData.data.id_type : ''}
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
                        defaultValue={dataByMethod.defaultData ? profileData.data.id : ''}
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
                        defaultValue={dataByMethod.defaultData ? profileData.data.first_name : ''}
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
                        defaultValue={dataByMethod.defaultData ? profileData.data.last_name : ''}
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
                        defaultValue={dataByMethod.defaultData ? profileData.data.city : ''}
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
                        defaultValue={dataByMethod.defaultData ? profileData.data.cellphone : ''}
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
                        defaultValue={
                          dataByMethod.defaultData ? profileData.data.user_id.email : ''
                        }
                        {...registro('email', { required: true })}
                        inputProps={{
                          maxLength: 254
                        }}
                        InputProps={{
                          readOnly: dataByMethod.defaultData
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Usuario"
                        autoComplete="nickname"
                        defaultValue={
                          dataByMethod.defaultData ? profileData.data.user_id.username : ''
                        }
                        {...registro('username', { required: true })}
                        inputProps={{
                          maxLength: 150
                        }}
                        InputProps={{
                          readOnly: dataByMethod.defaultData
                        }}
                      />
                    </Grid>
                    {dataByMethod.showPassword &&
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
                    }
                    {dataByMethod.showCaptcha &&
                      <Grid item xs={12} display='flex' justifyContent='center'>
                        <Reaptcha
                          sitekey={siteKey}
                          ref={captchaRef}
                          onVerify={verify}
                        />
                      </Grid>
                    }
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
                    {dataByMethod.buttonText}
                  </Button>
                  {dataByMethod.showAlreadyAccount &&
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link component={LinkRouter} to={'/signin'} variant="body2">
                          Ya tienes una cuenta? Ingresa
                        </Link>
                      </Grid>
                    </Grid>
                  }
                </form>
              </Box>
            </Box>
            {dataByMethod.showFooter && <Copyright />}
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
}
