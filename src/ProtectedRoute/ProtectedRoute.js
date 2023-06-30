import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

import { useExternalApi } from '../Api/Account/AccountResponse'

export default function ProtectedRoute ({ component: Component, ...args }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const nav = useNavigate()
  const { getInfoAccount } = useExternalApi()
  useEffect(() => {
    const token = localStorage.getItem('token')
    // console.log(token)
    getInfoAccount(token).then((res) => {
      // console.log(res)
      if (res.data.detail.localeCompare('Invalid token.') === 0) {
        console.log('No estoy registrado')
        setIsAuthenticated(false)
        nav('/signup')
      } else if (res.data.detail.localeCompare('User inactive or deleted.') === 0) {
        console.log('Estoy desactivado')
        setIsAuthenticated(false)
        nav('/')
      } else {
        console.log('Entre correctamente como admin? ', res.data.is_admin)
        if (res.data.is_admin) {
          console.log('Admin')
          localStorage.setItem('type', 'admin')
        } else {
          console.log('Medic')
          localStorage.setItem('type', 'medic')
        }
        if (!window.location.href.includes(localStorage.getItem('type'))) {
          console.log('Me meti donde no era')
          setIsAuthenticated(false)
          nav('/')
          localStorage.removeItem('token')
          localStorage.removeItem('type')
        } else {
          console.log('Entré a mi lugar correcto')
          setIsAuthenticated(true)
        }
      }
    }).catch((error) => {
      console.log('Hay un error: ', error)
      setIsAuthenticated(false)
      nav('/')
      localStorage.removeItem('token')
      localStorage.removeItem('type')
    })
  }, [])

  if (!isAuthenticated) {
    return (
    <Backdrop
      open={true}
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress size={75} color='inherit'/>
    </Backdrop>)
  }

  return (<Component
    {...args}
  />)
}
