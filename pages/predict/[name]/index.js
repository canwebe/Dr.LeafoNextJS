import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import BottomBar from '../../../components/bottomBar'
import styles from '../../../styles/Plant.module.css'
import * as tf from '@tensorflow/tfjs'
import toast from 'react-hot-toast'
import { diseaseName } from '../../../data/diseaseName'
import { getDisease } from '../../../lib/helper'

export default function PlantName() {
  const [imgUrl, setImgUrl] = useState('')
  const [model, setModel] = useState()
  const [data, setData] = useState()
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

  const fetchData = async (dname) => {
    const res = await getDisease(dname)
    if (res) {
      setData(res)
    }
  }

  const handleDiagnose = async () => {
    setisLoading(true)
    setData(null)
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
            return {
              precision: item,
              disName: diseaseName[name][i],
            }
          })
          .sort((a, b) => b.precision - a.precision)
          .slice(0, 3)
        setResult(top3)
        if (top3[0]?.precision * 100 > 50) {
          await fetchData(top3[0]?.disName?.toLowerCase())
        }
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
              {data && (
                <div className={styles.extraDataWrapper}>
                  <div>
                    <h2 className={styles.topM}>Info :</h2>
                    <p>{data?.info}</p>
                  </div>
                  <div>
                    <h2 className={styles.topM}>Managing :</h2>
                    <p>{data?.managing}</p>
                  </div>
                  <div>
                    <h2 className={styles.topM}>Signs :</h2>
                    <p>{data?.signs}</p>
                  </div>

                  {data?.medicine && (
                    <div>
                      <h2 className={styles.topM}>Medicine :</h2>
                      <p className={styles.medicine}>{data?.medicine}</p>
                    </div>
                  )}
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
