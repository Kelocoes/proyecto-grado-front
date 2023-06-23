import React from 'react'

import MainListItemsAdmin from './ListItemsAdmin'
import MainListItemsMedic from './ListItemsMedic'

export default function ListChooser (props) {
  const userType = window.localStorage.getItem('type')
  if (userType === 'Medic') {
    return <MainListItemsMedic setTitleAppBar = {props.setTitleAppBar}/>
  }
  if (userType === 'Admin') {
    return <MainListItemsAdmin setTitleAppBar = {props.setTitleAppBar}/>
  }
}
