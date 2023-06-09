import * as React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Link as LinkRouter } from 'react-router-dom'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import IconButton from '@mui/material/IconButton'

export default function Header (props) {
  const { title, actualTheme, setActualTheme } = props

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('type')
    window.location.reload()
  }

  const changeTheme = () => {
    setActualTheme(actualTheme.localeCompare('light') ? 'light' : 'dark')
  }

  return (
    <React.Fragment>
      <Grid container sx={{ paddingTop: 1, paddingBottom: { xs: 1, md: 0 } }}>
        <Grid item xs={12} md={7}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            textOverflow="ellipsis"
            overflow="hidden"
            display="inline-block"
            sx={{ flex: 1 }}
          >
            {title}
          </Typography>
        </Grid>
        {!localStorage.getItem('token') &&
          <Grid
            item xs={12} md={4}
            sx={{
              textAlign: { xs: 'center', md: 'right' },
              marginLeft: { xs: -1.25, md: 0 }
            }}
          >
            <Button
              size="small"
              component={LinkRouter}
              to={'/signin'}
              sx={{ mx: 1 }}
            >
              Iniciar Sesión
            </Button>
            <Button size="small" component={LinkRouter} to={'/signup'} sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              display: 'inline-block'
            }}>
              Registrarte
            </Button>
          </Grid>
        }
        {localStorage.getItem('token') &&
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }} >
            <Button
              size="small"
              component={LinkRouter}
              to={`/dashboard/${localStorage.getItem('type')}`}
              sx={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                display: 'inline-block'
              }}
            >
              Dashboard
            </Button>
            <Button onClick={logout} size="small" sx={{ mx: 1 }}>
              Cerrar Sesión
            </Button>
          </Grid>
        }
        <Grid
          item
          xs={12}
          md={1}
          sx={{
            textAlign: { xs: 'center', md: 'center' },
            marginTop: { xs: 0, md: -0.75 },
            padding: '0px'
          }}
        >
          <IconButton color="inherit" onClick={changeTheme}>
            {actualTheme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
