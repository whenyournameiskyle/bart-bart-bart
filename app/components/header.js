'use client'
import { useRouter } from 'next/navigation'
import styles from '../page.module.css'

export const Header = ({ children, shouldShowBack }) => {
  const router = useRouter()

  return (
    <div className={styles.header}>
      {shouldShowBack && (
        <button className={styles.backButton} onClick={() => router.back()}>
          ←
        </button>
      )}
      <div>
        <div>{children}</div>
      </div>
    </div>
  )
}
