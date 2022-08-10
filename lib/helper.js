import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { db } from './firebase'

export const getDisease = async (dname) => {
  const q = query(
    collection(db, 'disease'),
    where('disease', '==', dname),
    limit(1)
  )
  const snapshot = await getDocs(q)

  if (!snapshot.empty) {
    return snapshot.docs[0].data()
  }
}
