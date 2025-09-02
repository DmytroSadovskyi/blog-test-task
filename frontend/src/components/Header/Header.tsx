import { Link } from "react-router-dom"
import commonStyles from "../../styles/common.module.css"
import styles from "./Header.module.css"

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={commonStyles.container}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>Blog</Link>
          <span className={styles.separator}>|</span>
          <Link to="/create" className={styles.link}>Create Post</Link>
        </nav>
      </div>
    </header>
  )
 }