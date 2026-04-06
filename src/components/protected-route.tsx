// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import AppSpinner from './app-spinner'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const { token, isLoading } = useAuth()

//   if (isLoading) return <AppSpinner />
//   if (!token) return <Navigate to="/login" replace />

  return children
}

export default ProtectedRoute