import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/protected-route'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/home-page'
import LoginPage from './pages/login-page'

function App({ children }: { children: React.ReactNode }) {
  return (
    <>
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
                <>Nowhere</>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
