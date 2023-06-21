import React from 'react'

import MainListItemsAdmin from './ListItemsAdmin'
import MainListItemsMedic from './ListItemsMedic'

export default function ListChooser () {
  const userType = window.localStorage.getItem('type')
  if (userType === 'Medic') {
    return <MainListItemsMedic />
  }
  if (userType === 'Admin') {
    return <MainListItemsAdmin />
  }
}
