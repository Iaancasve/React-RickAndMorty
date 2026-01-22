import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CharactersApp } from './CharactersApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CharactersApp />
  </StrictMode>,
)
