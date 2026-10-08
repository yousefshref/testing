import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import VerifyOtp from './pages/VerifyOtp.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/verify" element={<VerifyOtp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
