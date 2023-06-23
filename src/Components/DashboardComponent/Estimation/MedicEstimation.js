import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

import CheckLocation from '../CheckLocation'

export default function MedicEstimation () {
  const nav = useNavigate()
  useEffect(() => {
    if (CheckLocation()) {
      nav('/')
    }
  }, [])

  return (
    <h1>Estimaciones como medico</h1>
  )
}
