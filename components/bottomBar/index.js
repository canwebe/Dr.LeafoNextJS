import styles from './bottomBar.module.css'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import { useRef, useState } from 'react'

export default function BottomBar({ setImgUrl, setResult }) {
  const [isOpen, setIsOpen] = useState(true)
  const inputRef = useRef()
  const inputRefNew = useRef()

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImgUrl(url)
      setIsOpen(false)
      setResult(null)
    }
  }

  return (
    <div className={styles.bottomBar}>
      <div className={styles.icon}>
        {isOpen ? (
          <FaChevronDown onClick={() => setIsOpen(false)} />
        ) : (
          <FaChevronUp onClick={() => setIsOpen(true)} />
        )}
      </div>

      {isOpen && (
        <div className={styles.content}>
          <button
            onClick={() => inputRefNew.current.click()}
            className={styles.btn}
          >
            Take a Photo
          </button>
          <p>or</p>
          <button
            onClick={() => inputRef.current.click()}
            className={styles.btn}
          >
            Choose from Gallery
          </button>
          <input
            ref={inputRef}
            className={styles.fileInput}
            type='file'
            accept='image/*'
            onChange={handleChange}
          />
          <input
            ref={inputRefNew}
            className={styles.fileInput}
            type='file'
            accept='image/*'
            capture='capture'
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  )
}
