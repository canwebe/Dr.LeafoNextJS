import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Link href='predict?name=potato'>
        <a>Potato</a>
      </Link>
      <Link href='predict?name=mango'>
        <a>Mango</a>
      </Link>
      <Link href='predict?name=rabbani'>
        <a>Rabbani</a>
      </Link>
    </>
  )
}
