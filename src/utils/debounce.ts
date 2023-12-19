import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { authStore } from "../store/authStore";
import { cookie } from "./cookie";

export const debounce = (fn: Function, delay = 3000) => {
  let timerId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
};

export const debounceCardsOrderList = debounce(
  async (cardOrderList: string[]) => {
    const uid = authStore.uid || cookie.getCookie("uid");
    if (!uid) return;
    const cardOrderListRef = doc(db, "user_cards", uid);
    await setDoc(cardOrderListRef, { cardOrderList });
  },
  10000,
);
