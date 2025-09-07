import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export function addData(collectionName: string, newVal: {}) {
  const dataRef = doc(db, collectionName, Date.now().toString());
  setDoc(dataRef, newVal);
}
