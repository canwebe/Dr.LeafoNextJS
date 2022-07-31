import Link from 'next/link'
import styles from './nav.module.css'

export default function Nav() {
  return (
    <nav>
      <div className='wrapper'>
        <div className={styles.navWrapper}>
          <Link href='/'>
            <a className={styles.logo}>Dr.Leafo</a>
          </Link>

          <a
            href='https://canwebe.tech'
            target='_blank'
            rel='noopener noreferrer'
          >
            By <span className={styles.cwb}>CanWeBe</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
