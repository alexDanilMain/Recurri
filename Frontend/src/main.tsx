import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="1021052820543-fm1vrkkpkq1idpvckttevn0ir9d9qdc2.apps.googleusercontent.com">
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </GoogleOAuthProvider>
)
