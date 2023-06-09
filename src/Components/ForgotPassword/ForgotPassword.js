import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useState, useEffect } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import { useForm } from 'react-hook-form'
import { Link as LinkRouter } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Fade from '@mui/material/Fade'

import { useExternalApi } from '../../Api/Account/AccountResponse'
import Copyright from '../Copyright/Copyright'

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function ForgotPassword () {
  // HOOKS

  // Form hook
  const { handleSubmit: getInfoRegister, register: registro } = useForm()

  // Api hook
  const { sendEmailPassword } = useExternalApi()

  // States
  const [response, setResponse] = useState({})
  const [message, setMessage] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)
  const [severity, setSeverity] = useState('info')
  const [openSnack, setOpenSnack] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // ARROW FUNCTIONS

  // Handle Close SnackBar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnack(false)
  }

  // Error handler
  const errorHandler = (type, message) => {
    setIsLoading(false)
    setSeverity(type)
    setOpenSnack(true)
    setMessage(message)
  }

  // Action by pressing main button
  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await sendEmailPassword(data, setResponse)
    } catch (error) {
      errorHandler('error', 'Ha ocurrido un error inesperado')
    }
  }

  // Get severity by status code response
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

  // USE EFFECTS

  // Action when response state is updated
  useEffect(() => {
    try {
      if (JSON.stringify(response) !== '{}') {
        setMessage(response.data.detail)
        getSeverity(response.status)
        setOpenSnack(true)
        setIsLoading(false)
      }
    } catch (error) {
      errorHandler('error', 'Ha ocurrido un error inesperado')
    }
  }, [response])

  return (
    <Fade in={true}>
      <Grid container justifyContent="center">
        <Card sx={{
          my: 8,
          width: '450px',
          p: 10,
          boxShadow: 20
        }}>
          <Box
            sx={{
              marginBottom: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <IconButton component={LinkRouter} to={'/'}>
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
            </IconButton>
            <Typography component="h1" variant="h5">
              Ingresa tu usuario o correo electrónico
            </Typography>
            <Box sx={{ mt: 1 }}>
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
                <Button
                  disabled={isDisabled}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={getInfoRegister(onSubmit)}
                >
                  {isLoading && <CircularProgress color="inherit" size={15} sx={{ mr: 1 }} />}
                  Enviar
                </Button>
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
    </Fade>
  )
}
