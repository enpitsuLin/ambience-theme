import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import 'uno.css'
import '@unocss/reset/tailwind-compat.css'

const root = createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
