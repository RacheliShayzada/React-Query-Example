import Link from 'next/link';
import React from 'react';
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/Users">Users</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/Cars">Cars</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
