import PropTypes from 'prop-types';
import MainNav from '../components/mainnav/MainNav.jsx';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <>
      <MainNav />
      <main className={styles.layout__container}>{children}</main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
