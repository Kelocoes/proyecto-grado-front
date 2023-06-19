import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import Landing from './Components/landing/Landing'
import Dashboard from './Components/dashboard/Dashboard'
import SignUp from './Components/sign-up/SignUp'
import SignIn from './Components/sign-in/SignIn'
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
