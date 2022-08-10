import Image from 'next/image'
import Link from 'next/link'
import { plantsData } from '../data/plants'
import styles from '../styles/Home.module.css'
import toast from 'react-hot-toast'
import Head from 'next/head'

export default function Home() {
  const handleClick = (e, item) => {
    const acc = ['potato', 'pepper', 'tomato']
    if (!acc.includes(item)) {
      e.preventDefault()
      toast.error('Access denied, Try Another')
    }
  }
  return (
    <>
      <Head>
        <title>Home | Dr.Leafo</title>
      </Head>
      <div className='wrapper'>
        <div className={styles.cardWrapper}>
          {plantsData.map((item, i) => (
            <Link href={`/predict/${item}`} key={i}>
              <a onClick={(e) => handleClick(e, item)} className={styles.card}>
                <div className={styles.photoWrapper}>
                  <div className={styles.photo}>
                    <Image
                      className={styles.img}
                      src={`/assets/${item}.svg`}
                      alt={item}
                      width='100%'
                      height='100%'
                      layout='responsive'
                      placeholder='blur'
                      blurDataURL='/assets/placeholder.webp'
                    />
                  </div>
                </div>

                <p className={styles.name}>{item}</p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
