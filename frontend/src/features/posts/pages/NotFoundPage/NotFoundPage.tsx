import { Link } from 'react-router-dom'
import commonStyles from '../../../../styles/common.module.css';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={`${commonStyles.container} ${styles.wrapper}`}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className={commonStyles.backLink}>Press here to go back</Link>
    </div>
  );
}