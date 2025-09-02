export const Footer = () => { 
  return (
    <footer style={{ padding: '1rem', background: '#f0f0f0', marginTop: '2rem' }}>
      <p>© {new Date().getFullYear()} My blog</p>
    </footer>
  )
}