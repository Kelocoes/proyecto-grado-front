import React, { useState } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
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
import MedicProfile from './Components/DashboardComponent/Profile/MedicProfile'
import AdminMedics from './Components/DashboardComponent/Medics/AdminMedics'
import DashboardEstimation from './Components/DashboardComponent/Estimation/DashboardEstimation'
import LandingReports from './Components/DashboardComponent/Reports/LandingReports'
import AdminProfile from './Components/DashboardComponent/Profile/AdminProfile'
import PatientsManagement from './Components/DashboardComponent/Patients/PatientsManagement'
import NotFound from './Components/NotFound/NotFound'
import GeneralReports from './Components/DashboardComponent/Reports/GeneralReports'
import AnonymousManagement from './Components/DashboardComponent/Reports/AnonymousManagement'

import './App.css'

export default function App () {
  const [actualTheme, setActualTheme] = useState('light')
  const [titleAppBar, setTitleAppBar] = useState('Inicio')
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
              main: '#00786A'
            }
          }
      )
    },
    typography: {
      fontFamily: 'MyFont'
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
                titleAppBar={titleAppBar}
                setTitleAppBar={setTitleAppBar}
              />
            }
          >
            <Route
              path="admin"
              element={
                <LandingDashboard
                  type="admin"
                  setTitleAppBar={setTitleAppBar}
                />
              }
            />
            <Route
              path="medic"
              element={
                <LandingDashboard
                  type="medic"
                  setTitleAppBar={setTitleAppBar}
                />
              }
            />
            <Route path="medic/patients" element={<PatientsManagement type="Medic" />} />
            <Route path="medic/estimation" element={<DashboardEstimation/>} />
            <Route path="medic/reports" element={<LandingReports type ="medic" />} />
            <Route path="medic/profile" element={<MedicProfile />} />
            <Route path="medic/reports/general" element={<GeneralReports type="Medic" />} />
            <Route path="admin/patients" element={<PatientsManagement type="Admin" />} />
            <Route path="admin/medics" element={<AdminMedics />} />
            <Route path="admin/estimation" element={<DashboardEstimation/>} />
            <Route path="admin/reports" element={<LandingReports type ="admin" />} />
            <Route path="admin/profile" element={<AdminProfile />} />
            <Route path="admin/reports/general" element={<GeneralReports type="Admin" />} />
            <Route path="admin/reports/tableanonymous"
              element={<AnonymousManagement />}
            />
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}
