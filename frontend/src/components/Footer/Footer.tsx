import commonStyles from '../../styles/common.module.css';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={commonStyles.container}>
        <p className={styles.text}>© {new Date().getFullYear()} My Blog</p>
      </div>
    </footer>
  );
};