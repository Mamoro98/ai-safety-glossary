import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// relative base ('./') makes asset URLs path-agnostic — works when served at the
// domain root (local preview) and under /ai-safety-glossary/ (GitHub Pages project site).
// Routing is hash-based, so no server rewrites are needed either.
export default defineConfig({
  base: './',
  plugins: [react()],
})
