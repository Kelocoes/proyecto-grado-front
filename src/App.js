import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Landing from './landing/Landing'
import Dashboard from './dashboard/Dashboard'

import './App.css'

export default function App () {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  )
}
