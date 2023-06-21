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
import { Link as LinkRouter, useParams } from 'react-router-dom'
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

export default function ChangePassword () {
  // HOOKS

  // Params hook
  const { token, secret } = useParams()

  // Form hook
  const { handleSubmit: getInfoRegister, register: registro } = useForm()

  // Api hook
  const { ChangePassword } = useExternalApi()

  // States hook
  const [response, setResponse] = useState({})
  const [message, setMessage] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)
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

  // Action when pressing main button
  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await ChangePassword(data, token, secret, setResponse)
    } catch (error) {
      errorHandler()
    }
  }

  // Action for snackbar when closing
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnack(false)
  }

  // Get severity from status code
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

  // Use effect when response state is updated
  useEffect(() => {
    try {
      if (JSON.stringify(response) !== '{}') {
        getSeverity(response.status)
        setIsLoading(false)
        setOpenSnack(true)
        setMessage(response.data.detail)
      }
    } catch (error) {
      errorHandler()
    }
  }, [response])

  return (
    <Grid container justifyContent="center">
      <Card sx={{ marginY: 8, width: '450px', padding: 10, boxShadow: 20 }}>
        <Box
          sx={{
            marginBottom: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <IconButton component={LinkRouter} to={'/'}>
            <Avatar sx={{ margin: 1, backgroundColor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
          </IconButton>
          <Typography component="h1" variant="h5">
            Ingresa tu nueva contraseña
          </Typography>
          <Box sx={{ marginTop: 1 }}>
            <form onSubmit={getInfoRegister(onSubmit)}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Nueva contraseña"
                autoComplete="new-password"
                type="password"
                autoFocus
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
                Cambiar contraseña
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
  )
}
