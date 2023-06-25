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
import LandingDashboard from './Components/DashboardComponent/LandingDashboard/LandingDashboard'
import MedicPatients from './Components/DashboardComponent/Patients/MedicPatients'
import MedicEstimation from './Components/DashboardComponent/Estimation/MedicEstimation'
import MedicReports from './Components/DashboardComponent/Reports/MedicReports'
import MedicProfile from './Components/DashboardComponent/Profile/MedicProfile'
import AdminPatients from './Components/DashboardComponent/Patients/AdminPatients'
import AdminMedics from './Components/DashboardComponent/Medics/AdminMedics'
import AdminEstimation from './Components/DashboardComponent/Estimation/AdminEstimation'
import AdminReports from './Components/DashboardComponent/Reports/AdminReports'
import AdminProfile from './Components/DashboardComponent/Profile/AdminProfile'

import './App.css'

export default function App () {
  const [actualTheme, setActualTheme] = useState('light')
  const customTheme = createTheme({
    palette: {
      mode: actualTheme,
      ...(actualTheme === 'dark'
        ? {
            background: {
              default: '#393939'
            }
          }
        : {
            background: {
              default: '#efefef'
            },
            primary: {
              main: '#1c41bff0'
            }
          }
      )
    },
    typography: {
      fontFamily: 'Georgia'
    }
  })

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={<Landing actualTheme={actualTheme} setActualTheme={setActualTheme} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/changepassword/:token/:secret" element={<ChangePassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                component={Dashboard}
                actualTheme={actualTheme}
                setActualTheme={setActualTheme}
              />
            }
          >
            <Route path="admin" element={<LandingDashboard type="admin" />} />
            <Route path="medic" element={<LandingDashboard type="medic" />} />
            <Route path="medic/patients" element={<MedicPatients />} />
            <Route path="medic/estimation" element={<MedicEstimation />} />
            <Route path="medic/reports" element={<MedicReports />} />
            <Route path="medic/profile" element={<MedicProfile />} />
            <Route path="admin/patients" element={<AdminPatients />} />
            <Route path="admin/medics" element={<AdminMedics />} />
            <Route path="admin/estimation" element={<AdminEstimation />} />
            <Route path="admin/reports" element={<AdminReports />} />
            <Route path="admin/profile" element={<AdminProfile />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}
