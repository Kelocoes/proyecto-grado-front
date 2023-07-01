import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

import CheckLocation from '../../../Utils/CheckLocation'

export default function MedicReports () {
  const nav = useNavigate()
  useEffect(() => {
    if (CheckLocation()) {
      nav('/')
    }
  }, [])

  return (
    <h1>Reporte de Medico</h1>
  )
}
