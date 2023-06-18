import * as React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Link as LinkRouter } from 'react-router-dom'

function Header (props) {
  const { title } = props

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('type')
    window.location.reload()
  }

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Grid container sx = {{ pb: { xs: 1, md: 0 } }}>
          <Grid item xs = {12} md = {7} sx= {{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              textOverflow= "ellipsis"
              whiteSpace= "nowrap"
              overflow= "hidden"
              display= "inline-block"
              sx={{ flex: 1 }}
            >
              {title}
            </Typography>
          </Grid>
          {!localStorage.getItem('token') &&
            <Grid item xs = {12} md = {5} sx= {{ textAlign: { xs: 'center', md: 'right' } }} >
              <Button variant="outlined" size="small" sx = {{ mx: 1 }}>
                Iniciar Sesión
              </Button>
              <Button variant="outlined" size="small" component = {LinkRouter} to = {'/signup'} sx = {{
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
            <Grid item xs = {12} md = {5} sx= {{ textAlign: { xs: 'center', md: 'right' } }} >
              <Button variant="outlined" size="small" component = {LinkRouter} to = {'/dashboard'} sx = {{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                display: 'inline-block'
              }}>
                Dashboard
              </Button>
              <Button variant="outlined" onClick = {logout}size="small" sx = {{ mx: 1 }}>
                Cerrar Sesión
              </Button>
            </Grid>
            }
        </Grid>
      </Toolbar>
    </React.Fragment>
  )
}

export default Header
