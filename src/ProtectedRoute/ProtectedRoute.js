import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useExternalApi } from '../Api/Account/AccountResponse'

export default function ProtectedRoute ({ component: Component, ...args }) {
  const { actualTheme, setActualTheme } = args
  const nav = useNavigate()
  const { getInfoAccount } = useExternalApi()
  useEffect(() => {
    const token = localStorage.getItem('token')
    // console.log(token)
    getInfoAccount(token).then((res) => {
      // console.log(res)
      if (res.data.detail.localeCompare('Invalid token.') === 0) {
        console.log('No estoy registrado')
        nav('/signup')
      } else if (res.data.detail.localeCompare('User inactive or deleted.') === 0) {
        console.log('Estoy desactivado')
        nav('/')
      } else {
        console.log('Entre correctamente como admin? ', res.data.is_admin)
        if (res.data.is_admin) {
          // console.log('Admin')
          localStorage.setItem('type', 'Admin')
        } else {
          // console.log('Medic')
          localStorage.setItem('type', 'Medic')
        }
        if (!window.location.href.includes(localStorage.getItem('type').toLowerCase())) {
          console.log('Me meti donde no era')
          nav('/')
          localStorage.removeItem('token')
          localStorage.removeItem('type')
        } else {
          console.log('Entré a mi lugar correcto')
        }
      }
    }).catch((error) => {
      console.log('Hay un error: ', error)
      nav('/')
      localStorage.removeItem('token')
      localStorage.removeItem('type')
    })
  }, [])
  return (<Component
    actualTheme={actualTheme}
    setActualTheme={setActualTheme}
  />)
}
