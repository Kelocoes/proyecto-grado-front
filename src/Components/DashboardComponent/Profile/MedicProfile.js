import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

import CheckLocation from '../CheckLocation'

export default function MedicProfile () {
  const nav = useNavigate()
  useEffect(() => {
    if (CheckLocation()) {
      nav('/')
    }
  }, [])

  return (
    <h1>Perfil de medico</h1>
  )
}
