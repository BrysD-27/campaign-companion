import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/protected-route'
import { AuthProvider } from './context/AuthContext'
import { LoadingProvider } from './hooks/use-loading'
import Campaigns from './pages/campaigns'
import HomePage from './pages/home-page'
import LoginPage from './pages/login-page'
import RegisterPage from './pages/register-page'
import SessionsPage from './pages/sessions-page'

function App({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/" element={
                  <ProtectedRoute>
                    <HomePage children={undefined} />
                  </ProtectedRoute>
                } />

                <Route path="/campaigns/:campaignId/*" element={
                  <ProtectedRoute>
                    <Campaigns />
                  </ProtectedRoute>

                }>
                  {/* child routes — each renders inside the Outlet */}
                  <Route path="sessions" element={<SessionsPage />} />
                  {/* <Route path="sessions/:sessionId" element={<SessionDetailPage />} />
                  <Route path="map" element={<WorldMapPage />} />
                  <Route path="sections/:sectionId" element={<SectionPage />} />
                  <Route path="entries/:entryId" element={<EntryPage />} /> */}
                </Route>
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </GoogleOAuthProvider>
      </LoadingProvider>
    </QueryClientProvider>
  )
}

export default App
