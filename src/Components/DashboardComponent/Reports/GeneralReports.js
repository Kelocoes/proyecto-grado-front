import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

import CheckLocation from '../../../Utils/CheckLocation'

export default function GeneralReports (props) {
  const nav = useNavigate()
  useEffect(() => {
    if (CheckLocation()) {
      nav('/')
    }
  }, [])

  return (
    <h1>Reporte general de {props.type}</h1>
  )
}
