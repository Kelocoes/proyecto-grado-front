import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useState, useEffect } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link as LinkRouter } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'

import { useExternalApi } from '../../Api/Account/AccountResponse'

function Copyright () {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Universidad del Valle, Escuela de Ingeniería de Sistemas y Computación, '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function SignIn () {
  // HOOKS

  // Form hook
  const { handleSubmit: getInfoRegister, register: registro } = useForm()

  // Api hook
  const { checkPassword } = useExternalApi()

  // Navigation hook
  const nav = useNavigate()

  // States hook
  const [response, setResponse] = useState({})
  const [isDisabled, setIsDisabled] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('info')
  const [openSnack, setOpenSnack] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // ARROW FUNCTIONS

  // Error handler
  const errorHandler = () => {
    setIsLoading(false)
    setSeverity('error')
    setOpenSnack(true)
    setMessage('Ha ocurrido un error inesperado')
  }

  // Action when pressing the main button
  const onSubmit = async (data) => {
    setIsLoading(true)
    setIsDisabled(true)
    try {
      await checkPassword(data, setResponse)
    } catch (error) {
      errorHandler()
    }
  }

  // Get severity state using status code
  const getSeverity = (statusCode) => {
    if (statusCode === 200) {
      setSeverity('success')
    } else if (statusCode < 500) {
      setSeverity('warning')
    } else {
      setSeverity('error')
    }
  }

  // Action when pressing close button in snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnack(false)
  }

  // USE EFFECTS

  // Action to perform when response state is updated
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
      errorHandler()
    }
  }, [response])

  return (
    <Grid container justifyContent="center">
      <Card sx={{ width: '450px', marginY: 8, padding: 10, boxShadow: 20 }}>
        <Box
          sx={{
            marginBottom: 1,
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
            Ingreso
          </Typography>
          <Box sx={{ marginTop: 1 }}>
            <form onSubmit={getInfoRegister(onSubmit)}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Usuario o correo"
                autoComplete="email"
                autoFocus
                {...registro('username', { required: true })}
                inputProps={{
                  maxLength: 254
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Contraseña"
                type="password"
                autoComplete="current-password"
                {...registro('password', { required: true })}
                inputProps={{
                  maxLength: 128
                }}
              />
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
                Ingresa
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link component={LinkRouter} to={'/forgotpassword'} variant="body2">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={LinkRouter} to={'/signup'} variant="body2">
                    {'¿No tienes cuenta? Registrate'}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
        <Copyright />
      </Card>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  )
}
