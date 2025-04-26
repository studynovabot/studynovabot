import { db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export async function saveUserInfo(uid: string, userData: { name: string; email: string }) {
  await setDoc(doc(db, "users", uid), userData);
}
