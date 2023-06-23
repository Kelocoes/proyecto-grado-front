import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupIcon from '@mui/icons-material/Group'
import ApiIcon from '@mui/icons-material/Api'
import BarChartIcon from '@mui/icons-material/BarChart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import { Link as LinkRouter } from 'react-router-dom'

export default function MainListItemsAdmin (props) {
  return (
    <React.Fragment>
      <ListItemButton component={LinkRouter} to={'/'}
        onClick = {() => { props.setTitleAppBar('') }}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Página principal" />
      </ListItemButton>
      <ListItemButton component={LinkRouter} to={'medic'}
        onClick = {() => { props.setTitleAppBar('Inicio') }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Inicio" />
      </ListItemButton>
      <ListItemButton component={LinkRouter} to={'medic/patients'}
        onClick = {() => { props.setTitleAppBar('Pacientes') }}
      >
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Pacientes" />
      </ListItemButton>
      <ListItemButton component={LinkRouter} to={'medic/estimation'}
        onClick = {() => { props.setTitleAppBar('Estimación') }}
      >
        <ListItemIcon>
          <ApiIcon />
        </ListItemIcon>
        <ListItemText primary="Estimación" />
      </ListItemButton>
      <ListItemButton component={LinkRouter} to={'medic/reports'}
        onClick = {() => { props.setTitleAppBar('Reportes') }}
      >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reportes" />
      </ListItemButton>
      <ListItemButton component={LinkRouter} to={'medic/profile'}
        onClick = {() => { props.setTitleAppBar('Perfil') }}
      >
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Perfil" />
      </ListItemButton>
      <ListItemButton
        component={LinkRouter} to={'/'}
        onClick = {() => {
          props.setTitleAppBar('Cerrando sesión...')
          localStorage.removeItem('token')
          localStorage.removeItem('type')
        }}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Cerrar sesión" />
      </ListItemButton>
    </React.Fragment>
  )
}
