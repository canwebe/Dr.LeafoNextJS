import * as tf from '@tensorflow/tfjs'

export default async function handler(req, res) {
  const imgData = req.body
  console.log('file', typeof imgData, imgData)
  const img = await tf.browser.fromPixels(imgData)
  console.log(img)
  res.status(200).json({ name: 'John Doe' })
}
