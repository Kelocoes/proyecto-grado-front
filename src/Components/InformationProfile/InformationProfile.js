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
import * as EmailValidator from 'email-validator'
import Skeleton from '@mui/material/Skeleton'

import { useEnv } from '../../Context/EnvContext'
import { useExternalApi as useExternalApiMedic } from '../../Api/Medic/MedicResponse'
import { useExternalApi as useExternalApiAdmin } from '../../Api/Admin/AdminResponse'
import Copyright from '../Copyright/Copyright'

function transformarString (text) {
  let result = text.toLowerCase()
  result = result.charAt(0).toUpperCase() + result.slice(1)
  result = result.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return result
}

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function InformationProfile (props) {
  // PROPS

  const { method, type } = props

  // HOOKS

  // Form hook
  const { handleSubmit: getInfoRegister, register: registro } = useForm()

  // Env hook
  const { siteKey } = useEnv()

  // Api hook
  const { createMedic, getCaptchaScore, getMedic, updateMedic } = useExternalApiMedic()
  const { getAdmin, updateAdmin } = useExternalApiAdmin()

  // Navigation hook
  const nav = useNavigate()

  // Ref hook
  const captchaRef = useRef(null)

  // States hook
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [response, setResponse] = useState({})
  const [profileData, setProfileData] = useState({})
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('info')
  const [openSnack, setOpenSnack] = useState(false)
  const [captchaToken, setCaptchaToken] = useState(null)
  const [captchaResponse, setCaptchaResponse] = useState(null)
  const [data, setData] = useState(null)

  // CONSTANTS

  const tipeId = [{ value: 'CC', label: 'CC' }, { value: 'CE', label: 'CE' }]

  const isUpdate = method === 'UPDATE'

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
    try {
      if (EmailValidator.validate(data.email)) {
        setIsValidEmail(true)
        setIsLoading(true)
        if (!isUpdate) {
          if (captchaToken) {
            // console.log(captchaToken)
            await getCaptchaScore(captchaToken, setCaptchaResponse)
          } else {
            errorHandler('warning', 'Debes hacer la prueba del captcha')
            captchaRef.current.reset()
          }
        } else {
          data.city = transformarString(data.city)
          type === 'medic'
            ? await updateMedic(data, setResponse, localStorage.getItem('token'))
            : await updateAdmin(data, setResponse, localStorage.getItem('token'))
        }
        setData(data)
      } else {
        setIsValidEmail(false)
      }
    } catch (error) {
      errorHandler('error', 'Ha ocurrido un error inesperado')
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
            errorHandler('warning', 'No has pasado la prueba del captcha')
            captchaRef.current.reset()
          }
        }
      } catch (error) {
        errorHandler('error', 'Ha ocurrido un error inesperado')
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
            } else {
              captchaRef.current.reset()
            }
          }, 2000)
        }
      }
    } catch (error) {
      errorHandler('error', 'Ha ocurrido un error inesperado')
    }
  }, [response])

  // Effect when component is mounted
  useEffect(() => {
    async function fetchData () {
      try {
        if (isUpdate) {
          type === 'medic'
            ? await getMedic(setProfileData, localStorage.getItem('token'))
            : await getAdmin(setProfileData, localStorage.getItem('token'))
        }
      } catch (error) {
        errorHandler('error', 'Ha ocurrido un error inesperado')
      }
    }
    fetchData()
  }, [])

  if (isUpdate && JSON.stringify(profileData) === '{}') {
    return (
      <Fade in={true}>
        <Grid container justifyContent='center'>
          <Skeleton
            animation="wave"
            variant="rounded"
            width="550px"
            height="600px"
            sx={{ marginY: 5, boxShadow: 20 }}
          />
        </Grid>
      </Fade>
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
              {!isUpdate &&
                <IconButton component={LinkRouter} to={'/'}>
                  <Avatar sx={{ margin: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                </IconButton>
              }
              <Typography component="h1" variant="h5">
                {isUpdate ? 'Tu perfil' : 'Regístrate'}
              </Typography>
              {isUpdate &&
                <Typography variant="body2" paddingTop={1}>
                  Último inicio de sesión: {profileData.data.user_id.last_login.split('T')[0]}
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
                        defaultValue={isUpdate ? profileData.data.id_type : ''}
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
                        defaultValue={isUpdate ? profileData.data.id : ''}
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
                        defaultValue={isUpdate ? profileData.data.first_name : ''}
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
                        defaultValue={isUpdate ? profileData.data.last_name : ''}
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
                        defaultValue={isUpdate ? profileData.data.city : ''}
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
                        defaultValue={isUpdate ? profileData.data.cellphone : ''}
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
                        error={!isValidEmail}
                        helperText={!isValidEmail &&
                          'Por favor, ingresa un correo electrónico válido.'
                        }
                        defaultValue={
                          isUpdate ? profileData.data.user_id.email : ''
                        }
                        {...registro('email', { required: true })}
                        inputProps={{
                          maxLength: 254
                        }}
                        InputProps={{
                          readOnly: isUpdate
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
                          isUpdate ? profileData.data.user_id.username : ''
                        }
                        {...registro('username', { required: true })}
                        inputProps={{
                          maxLength: 150
                        }}
                        InputProps={{
                          readOnly: isUpdate
                        }}
                      />
                    </Grid>
                    {!isUpdate &&
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
                    {!isUpdate &&
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
                    {isUpdate ? 'Actualizar' : 'Registrarse'}
                  </Button>
                  {!isUpdate &&
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
            {!isUpdate && <Copyright />}
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
