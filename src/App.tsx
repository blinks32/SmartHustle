import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Auth } from './pages/Auth'
import { Bookings } from './pages/Bookings'
import { Clients } from './pages/Clients'
import { Invoices } from './pages/Invoices'
import { AiChat } from './pages/AiChat'
import { Flyers } from './pages/Flyers'
import { Analytics } from './pages/Analytics'
import { useAuth } from './hooks/useAuth'

const queryClient = new QueryClient()

function AppContent() {
  const { user, loading, error, isConfigured } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  // Show configuration error if Supabase is not set up
  if (!isConfigured || error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-xl font-bold mb-4">Configuration Required</h1>
          <p className="text-gray-400 mb-6">
            {error || 'Supabase is not configured. Please set up your environment variables.'}
          </p>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-left text-sm">
            <p className="font-medium mb-2">To get started:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-300">
              <li>Click "Connect to Supabase" in the top right</li>
              <li>Create a new Supabase project</li>
              <li>Copy your project URL and anon key</li>
              <li>Set up your environment variables</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }
  if (!user) {
    return <Auth />
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="clients" element={<Clients />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="ai-chat" element={<AiChat />} />
          <Route path="flyers" element={<Flyers />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}

export default App