import Landing from './landing/Landing'
import Dashboard from './dashboard/Dashboard'
import './App.css';
import { Routes, Route } from 'react-router-dom'
import GraphEstimation from './EstimationComponent/GraphEstimation';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/estimation" element={<GraphEstimation />}></Route>
    </Routes>
  );
}
