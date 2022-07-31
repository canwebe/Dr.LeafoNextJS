import Image from 'next/image'
import Link from 'next/link'
import { plantsData } from '../data/plants'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className='wrapper'>
      <div className={styles.cardWrapper}>
        {plantsData.map((item, i) => (
          <Link href={`/predict/${item}`} key={i}>
            <a className={styles.card}>
              <div className={styles.photoWrapper}>
                <div className={styles.photo}>
                  <Image
                    className={styles.img}
                    src={`/assets/${item}.svg`}
                    alt={item}
                    width='100%'
                    height='100%'
                    layout='responsive'
                  />
                </div>
              </div>

              <p className={styles.name}>{item}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}
