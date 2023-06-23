import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

import CheckLocation from '../CheckLocation'

export default function AdminEstimation () {
  const nav = useNavigate()
  useEffect(() => {
    if (CheckLocation()) {
      nav('/')
    }
  }, [])

  return (
    <h1>Estimaciones como Admin</h1>
  )
}
