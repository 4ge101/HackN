import Sidebar from '../components/Sidebar'

export default function Saved() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#000' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: 40, color: '#fff', fontFamily: 'Poppins' }}>
        <h2 style={{ color: '#ff8500', marginBottom: 10 }}>Bookmarks</h2>
        <p style={{ color: '#555' }}>No bookmarks yet.</p>
      </div>
    </div>
  )
}