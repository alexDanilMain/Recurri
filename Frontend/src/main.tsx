import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="1021052820543-fm1vrkkpkq1idpvckttevn0ir9d9qdc2.apps.googleusercontent.com">
    <React.StrictMode>
      <QueryClientProvider client ={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
)
