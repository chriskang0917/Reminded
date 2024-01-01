import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { authStore } from "../store/authStore";
import { cookie } from "./cookie";

export const getUid = (): string => {
  const uid = authStore.uid || cookie.getCookie("uid");
  try {
    if (!uid) throw new Error("uid not found");
  } catch (error) {
    console.error(error);
  }
  return uid;
};

export const database = {
  validatePath(type: "doc" | "collection", paths: string[]) {
    try {
      if (!paths.length) {
        throw new Error("Ref Error: Path is required");
      }
      if (type === "doc" && paths.length % 2 !== 0) {
        throw new Error(`Ref Error: The paths for doc are even.`);
      }
      if (type === "collection" && paths.length % 2 === 0) {
        throw new Error(`Ref Error: The paths for collection are odd.`);
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  async getDoc(paths: string[] = ["user_cards", getUid()]) {
    if (!this.validatePath("doc", paths)) return;
    if (!getUid()) return;
    const [root, ...rest] = paths;
    const docRef = doc(db, root, ...rest);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  },
  async setDoc(
    paths: string[] = ["user_cards", getUid()],
    data: Partial<unknown>,
  ) {
    if (!this.validatePath("doc", paths)) return;
    if (!getUid()) return;
    const [root, ...rest] = paths;
    const docRef = doc(db, root, ...rest);
    return await setDoc(docRef, data, { merge: true });
  },
  async getCollection(paths: string[] = ["user_cards", getUid(), "cards"]) {
    if (!this.validatePath("collection", paths)) return;
    if (!getUid()) return;
    const [root, ...rest] = paths;
    const docRef = doc(db, root, ...rest);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  },
  async deleteDoc(paths: string[]) {
    if (!this.validatePath("doc", paths)) return;
    if (!getUid()) return;
    const [root, ...rest] = paths;
    const docRef = doc(db, root, ...rest);
    return await deleteDoc(docRef);
  },
  async arrayRemove(paths: string[] = ["user_cards", getUid()], data: unknown) {
    if (!this.validatePath("doc", paths)) return;
    if (!getUid()) return;
    const [root, ...rest] = paths;
    const docRef = doc(db, root, ...rest);
    return await updateDoc(docRef, { cardOrderList: arrayRemove(data) });
  },
};
