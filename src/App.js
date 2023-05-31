import Blog from './blog/Blog'
import Dashboard from './dashboard/Dashboard'
import './App.css';
import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Blog />} />
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
}
