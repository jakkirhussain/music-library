import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MusicApp from './MusicApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MusicApp />
  </StrictMode>,
)
