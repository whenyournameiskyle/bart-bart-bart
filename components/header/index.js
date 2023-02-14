import Link from 'next/link';
import styles from '../../styles/Home.module.css';

export const Header = ({ children, shouldShowBack }) => (
  <div className={styles.header}>
    {shouldShowBack && (
      <Link href="/">
        <button className={styles.backButton}>←</button>
      </Link>
    )}
    <div>
      <div>{children}</div>
    </div>
  </div>
);
