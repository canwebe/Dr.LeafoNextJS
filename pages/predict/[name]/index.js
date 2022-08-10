import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import BottomBar from '../../../components/bottomBar'
import styles from '../../../styles/Plant.module.css'
import * as tf from '@tensorflow/tfjs'
import toast from 'react-hot-toast'
import { diseaseName } from '../../../data/diseaseName'

export default function PlantName() {
  const [imgUrl, setImgUrl] = useState('')
  const [model, setModel] = useState()
  const [isLoading, setisLoading] = useState(false)
  const [result, setResult] = useState()
  const router = useRouter()
  const { name } = router.query
  const imgRef = useRef()

  const loadModel = async () => {
    const toastId = toast.loading('Loading Model..')
    try {
      const model = await tf.loadGraphModel(`/models/${name}/model.json`)
      setModel(model)
      toast.success('Model Loaded', {
        id: toastId,
      })
    } catch (error) {
      toast.error('Model Loading Error, Please Reload!', {
        id: toastId,
      })
      console.log(error)
    }
  }

  const handleDiagnose = async () => {
    setisLoading(true)
    const toastId = toast.loading('Predicting the output')
    if (model) {
      try {
        // const imgData = tf.browser
        //   .fromPixels(imgRef.current)
        //   .resizeBilinear([256, 256])
        //   .toFloat()
        //   .div(tf.scalar(255.0))
        //   .expandDims()
        const imgData = tf.browser
          .fromPixels(imgRef.current)
          .resizeBilinear([256, 256])
          .expandDims()
        const res = await model.predict(imgData).data()

        const top3 = Array.from(res)
          .map((item, i) => {
            console.log('ddd', item)
            return {
              precision: item,
              disName: diseaseName[name][i],
            }
          })
          .sort((a, b) => b.precision - a.precision)
          .slice(0, 3)
        setResult(top3)
        toast.success('Prediction Successfull', {
          id: toastId,
        })
        setisLoading(false)
      } catch (error) {
        console.log(error)
        toast.error('Prediction Failed', {
          id: toastId,
        })
      }
    } else {
      toast.error('Model is not loaded!', {
        id: toastId,
      })
    }
  }

  useEffect(() => {
    if (!model) {
      loadModel()
    }
  }, [])

  return (
    <div className='wrapper'>
      <h2 className={styles.title}>Choose {name} Image</h2>
      {console.log(result?.res)}
      {imgUrl && (
        <>
          <img
            ref={imgRef}
            className={styles.imgDiv}
            src={imgUrl}
            alt='Captured Data'
          />
          <p className={styles.warning}>
            Warning : Only diagnose {name} leaf here{' '}
          </p>
          <button
            disabled={isLoading}
            onClick={handleDiagnose}
            className={styles.btnDiag}
          >
            {isLoading ? 'Loading..' : 'Diagnose'}
          </button>
          {result && (
            <div className={styles.resultWrapper}>
              <h2>Result:</h2>
              <p>Name : {result[0].disName}</p>
              <p>Accuracy : {(result[0].precision * 100).toFixed(2)}%</p>
              <hr className={styles.hr} />
              <h2>All info:</h2>

              {result.map((item, i) => (
                <p key={i}>
                  {item.disName} : {(item.precision * 100).toFixed(2)}%
                </p>
              ))}
              <hr className={styles.hr} />
              {result[0].precision * 100 > 50 && (
                <div>
                  <h2>Cause :</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cumque pariatur ab, quos expedita reprehenderit, corrupti
                    laboriosam deleniti tempore sit ex sint ipsum debitis
                    officiis, mollitia consequatur dolore! Possimus, earum
                    dolorem.
                  </p>
                  <h2>Remedy :</h2>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ducimus dicta rerum alias saepe amet sunt. Atque eaque,
                    obcaecati quia, labore ullam quam commodi distinctio velit
                    nihil, asperiores eum modi laborum.
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
      <BottomBar setImgUrl={setImgUrl} setResult={setResult} />
    </div>
  )
}
