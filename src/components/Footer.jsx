export default function Footer() {
  return (
    <footer style={{ padding: '32px 0', textAlign: 'center' }}>
      <p className="mono muted" style={{ fontSize: '13px' }}>
        © {new Date().getFullYear()} Josh Henrick D. Catchillar · built with React &amp; Vite
      </p>
    </footer>
  )
}
