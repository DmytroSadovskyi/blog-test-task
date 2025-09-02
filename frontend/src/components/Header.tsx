import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <header style={{ padding: '1rem', background: '#f0f0f0' }}>
      <nav>
        <Link to="/">Blog</Link> | <Link to="/create">Create post</Link>
      </nav>
    </header>
  )
 }