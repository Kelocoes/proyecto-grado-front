import React, { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import Landing from './Components/LandingPage/Landing'
import Dashboard from './Components/DashboardComponent/Dashboard'
import SignUp from './Components/SignUp/SignUp'
import SignIn from './Components/SignIn/SignIn'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import ChangePassword from './Components/ChangePassword/ChangePassword'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'

import './App.css'

export default function App () {
  const [actualTheme, setActualTheme] = useState('light')

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: actualTheme
        }
      })}>
      <CssBaseline/>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={<Landing actualTheme = {actualTheme} setActualTheme = {setActualTheme}/>}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/changepassword/:token/:secret" element={<ChangePassword />} />
          <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />}></Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}
