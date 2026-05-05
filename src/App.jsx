import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Workout } from './pages/Workout';
import { HabitTracker } from './pages/HabitTracker';
import { Profile } from './pages/Profile';
import { ProtectedRoute } from './features/auth/ProtectedRoute';
import { useTheme } from './hooks/useTheme';


function App() {
  useTheme();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/workout" element={
            <ProtectedRoute>
              <Workout />
            </ProtectedRoute>
          } />
          <Route path="/habit-tracker" element={
            <ProtectedRoute>
              <HabitTracker />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
