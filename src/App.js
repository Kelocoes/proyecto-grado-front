import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Landing from './landing/Landing'
import Dashboard from './dashboard/Dashboard'
import SignUp from './sign-up/SignUp'
import SignIn from './sign-in/SignIn'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'

import './App.css'

export default function App () {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<ProtectedRoute component = {Dashboard} />}></Route>
    </Routes>
  )
}
