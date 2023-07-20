import { Link } from 'react-router-dom';
import styles from './MainNav.module.css';

export default function MainNav() {
  return (
    <nav className={styles.mainnav}>
      <Link to={'/'}>Home</Link>
      <Link to={'/listings'}>Listings</Link>
    </nav>
  );
}
