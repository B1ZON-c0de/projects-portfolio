import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export async function fetchData<T>(collectionName: string): Promise<T[]> {
  const dataCollection = collection(db, collectionName);
  const dataSnapshot = await getDocs(dataCollection);
  return dataSnapshot.docs.map((el) => el.data() as T);
}
