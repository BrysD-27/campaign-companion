import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/protected-route'
import { AuthProvider } from './context/AuthContext'
import { LoadingProvider } from './hooks/use-loading'
import Campaigns from './pages/campaigns'
import HomePage from './pages/home-page'
import LoginPage from './pages/login-page'

function App({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route path="/" element={
              <ProtectedRoute>
                <HomePage children={undefined} />
              </ProtectedRoute>
            } />

            <Route path="/campaigns/:id/*" element={
              <ProtectedRoute>
                <Campaigns children={children} />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LoadingProvider>
  )
}

export default App
