import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

import CheckLocation from '../CheckLocation'

export default function MedicPatients () {
  const nav = useNavigate()
  useEffect(() => {
    if (CheckLocation()) {
      nav('/')
    }
  }, [])

  return (
    <h1>Pacientes de medico</h1>
  )
}
