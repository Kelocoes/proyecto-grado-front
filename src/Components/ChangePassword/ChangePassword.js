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
  const { token, secret } = useParams()
  const { handleSubmit: getInfoRegister, register: registro } = useForm()
  const { ChangePassword } = useExternalApi()
  const [response, setResponse] = useState({})
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('info')
  const [openSnack, setOpenSnack] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    setIsLoading(true)
    await ChangePassword(data, token, secret, setResponse)
  }

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

  useEffect(() => {
    if (JSON.stringify(response) !== '{}') {
      getSeverity(response.status)
      setIsLoading(false)
      setOpenSnack(true)
      setMessage(response.data.detail)
    }
  }, [response])

  return (
    <Grid container justifyContent="center">
      <Card sx={{ my: 8, width: '450px', p: 10, boxShadow: 20 }}>
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
            Ingresa tu nueva contraseña
          </Typography>
          <Box sx={{ mt: 1 }}>
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
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={getInfoRegister(onSubmit)}
              >
                {isLoading && <CircularProgress color="inherit" size={15} sx={{ mr: 1 }} />}
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
