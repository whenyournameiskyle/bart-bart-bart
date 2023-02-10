import Link from 'next/link';

import currentTimeStringFormatter from '../../helpers/current-time-string-formatter';
import styles from '../../styles/Home.module.css';

export const Header = ({ children, shouldShowBack, updatedTime }) => (
  <div className={styles.header}>
    {shouldShowBack && (
      <Link href="/">
        <button className={styles.backButton}>←</button>
      </Link>
    )}
    <div>
      <div>{children}</div>
      <div className={styles.timeText}>{updatedTime || currentTimeStringFormatter()}</div>
    </div>
  </div>
);
