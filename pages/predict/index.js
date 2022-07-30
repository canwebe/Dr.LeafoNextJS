import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import Image from 'next/image'

const names = [
  'Potato___Early_blight',
  'Potato___Late_blight',
  'Potato___healthy',
]
export default function Predict() {
  const [imageUrl, setImageUrl] = useState()
  const [dName, setDName] = useState('')
  const [accuracy, setAccuracy] = useState('')
  const imgRef = useRef()

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }

  const handleDiagnose = async () => {
    const imgData = await tf.browser
      .fromPixels(imgRef.current)
      .resizeBilinear([256, 256])
      .toFloat()
      .div(tf.scalar(255.0))
      .expandDims()

    const model = await tf.loadLayersModel('/converted/model.json')
    const res = await model.predict(imgData).data()
    const max = await tf.argMax(res).data()
    const dis = names[max]
    const precision = await tf.max(res).data()

    setAccuracy(precision[0])
    setDName(dis)
    console.log(dName, accuracy)
  }

  return (
    <>
      <input
        type='file'
        accept='image/*'
        capture='capture'
        onChange={handleChange}
      />
      {imageUrl && (
        <>
          <img ref={imgRef} src={imageUrl} alt='target' />
          <button onClick={handleDiagnose}>Diagnose</button>
          {dName && <p>Name: {dName}</p>}
          {accuracy && <p>Accuracy: {(accuracy * 100).toFixed(2)}%</p>}
        </>
      )}
    </>
  )
}
