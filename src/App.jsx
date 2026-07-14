import { Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import TermDetail from './components/TermDetail.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/term/:slug" element={<TermDetail />} />
    </Routes>
  )
}
