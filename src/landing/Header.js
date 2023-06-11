import * as React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
// import { Link as LinkRouter } from 'react-router-dom';

function Header (props) {
  const { title } = props

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {/* <Button size="small" component = {LinkRouter} to = '/' >Dashboard</Button> */}
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
        <Button variant="outlined" size="small" sx = {{ mx: 1 }}>
          Iniciar Sesión
        </Button>
        <Button variant="outlined" size="small" sx = {{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          display: 'inline-block'
        }}>
          Registrarte
        </Button>
      </Toolbar>
    </React.Fragment>
  )
}

export default Header
