import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

import CheckLocation from '../../../Utils/CheckLocation'
import InformationProfile from '../../InformationProfile/InformationProfile'

export default function MedicProfile () {
  const nav = useNavigate()
  useEffect(() => {
    if (CheckLocation()) {
      nav('/')
    }
  }, [])

  return (
    <InformationProfile method="UPDATE" type="admin" />
  )
}
