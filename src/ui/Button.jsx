export default function Button({ children, onClick, variant = 'default', style = {} }) {
  const base = {
    fontSize: 13,
    padding: '6px 14px',
    borderRadius: 4,
    border: '0.5px solid #e8e8e0',
    background: 'transparent',
    color: 'inherit',
    cursor: 'pointer',
    fontFamily: "'IBM Plex Sans', sans-serif",
    ...style,
  }

  if (variant === 'primary') {
    base.background = '#FF6600'
    base.color = 'white'
    base.border = 'none'
  }

  return (
    <button onClick={onClick} style={base}>
      {children}
    </button>
  )
}