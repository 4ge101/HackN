import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import PWABanner from './components/PWABanner'
import Home from './Pages/Home'
import Story from './Pages/Story'
import User from './Pages/User'
import Saved from './Pages/Saved'
import Favourites from './Pages/Favourites'
import Settings from './Pages/Settings'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle, isDark } = useTheme()
  const [query, setQuery] = useState('')

  return (
    <BrowserRouter>
      <div style={{
        minHeight: '100vh',
        background: isDark ? '#000' : '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Navbar theme={theme} query={query} onSearch={setQuery} />

        <div style={{ display: 'flex', flex: 1 }}>
          <Sidebar theme={theme} onThemeToggle={toggle} />

          <Routes>
            <Route path="/"           element={<Home feed="top"  theme={theme} query={query} setQuery={setQuery} />} />
            <Route path="/new"        element={<Home feed="new"  theme={theme} query={query} setQuery={setQuery} />} />
            <Route path="/ask"        element={<Home feed="ask"  theme={theme} query={query} setQuery={setQuery} />} />
            <Route path="/show"       element={<Home feed="show" theme={theme} query={query} setQuery={setQuery} />} />
            <Route path="/jobs"       element={<Home feed="job"  theme={theme} query={query} setQuery={setQuery} />} />
            <Route path="/saved"      element={<Saved       theme={theme} />} />
            <Route path="/favourites" element={<Favourites  theme={theme} />} />
            <Route path="/settings"   element={<Settings    theme={theme} onThemeToggle={toggle} />} />
            <Route path="/item/:id"   element={<Story       theme={theme} />} />
            <Route path="/user/:id"   element={<User        theme={theme} />} />
            <Route path="*"           element={<Home feed="top"  theme={theme} />} />
          </Routes>
        </div>

        {/* PWA banners - install, offline, update */}
        <PWABanner theme={theme} />
      </div>
    </BrowserRouter>
  )
}