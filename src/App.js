import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import Landing from './Components/Landing/Landing'
import Dashboard from './Components/Dashboard/Dashboard'
import SignUp from './Components/SignUp/SignUp'
import SignIn from './Components/SignIn/SignIn'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import ChangePassword from './Components/ChangePassword/ChangePassword'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'

import './App.css'

export default function App () {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/changepassword/:token/:secret" element={<ChangePassword />} />
        <Route path="/dashboard" element={<ProtectedRoute component = {Dashboard} />}></Route>
      </Routes>
    </HashRouter>
  )
}
