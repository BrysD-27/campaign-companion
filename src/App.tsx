import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import './App.css'
import ProtectedRoute from './components/protected-route'
import { useAuth } from './context/auth-context'
import { AuthProvider } from './context/auth-context'
import { CampaignProvider } from './hooks/campaign-provider'
import { LoadingProvider } from './hooks/use-loading'
import { applyTheme } from './lib/themes'
import type { BaseColorId, ThemeColorId } from './lib/themes'
import AccountPage from './pages/account-page'
import ForgotPasswordPage from './pages/auth/forgot-password-page'
import LoginPage from './pages/auth/login-page'
import RegisterPage from './pages/auth/register-page'
import ResetPasswordPage from './pages/auth/reset-password-page'
import VerifyEmailPage from './pages/auth/verify-email-page'
import CampaignsPage from './pages/campaigns/campaigns-page'
import HomePage from './pages/campaigns/home-page'
import MapsPage from './pages/maps/maps-page'
import SectionPage from './pages/sections/section-page'
import SessionsPage from './pages/sessions/sessions-page'
import SettingsPage from './pages/settings-page'
import InventoryPage from './pages/inventory/inventory-page'

function ThemeApplier() {
  const { user } = useAuth()
  const { setTheme } = useTheme()
  useEffect(() => {
    if (!user?.preferences) return
    const { colorMode, baseColor, themeColor } = user.preferences
    setTheme(colorMode || 'system')
    applyTheme((baseColor || 'taupe') as BaseColorId, (themeColor || 'teal') as ThemeColorId)
  }, [user?.preferences?.colorMode, user?.preferences?.baseColor, user?.preferences?.themeColor])
  return null
}

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <ThemeApplier />
            <BrowserRouter>
              <Toaster position="top-center"
                toastOptions={{
                  classNames: {
                    toast: 'toast',
                    title: 'title',
                    description: 'description',
                    actionButton: 'action-button',
                    cancelButton: 'cancel-button',
                    closeButton: 'close-button',
                  },
                }} />
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path='/verify-email' element={<VerifyEmailPage />} />
                {/* <Route path="/join/:code" element={<JoinViaLinkPage />} /> */}
                <Route path="/account" element={<AccountPage />} />
                <Route path="/settings" element={<SettingsPage />} />

                <Route path="/" element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                } />

                <Route path="/campaigns/:campaignId/*" element={
                  <ProtectedRoute>
                    <CampaignProvider>
                      <CampaignsPage />
                    </CampaignProvider>
                  </ProtectedRoute>

                }>
                  {/* child routes — each renders inside the Outlet */}
                  <Route path="sessions" element={<SessionsPage />} />
                  <Route path="inventory" element={<InventoryPage />} />
                  <Route path="maps" element={<MapsPage />} />
                  <Route path="sections/:sectionId" element={<SectionPage />} />
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
