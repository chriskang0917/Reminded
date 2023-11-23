import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { makeAutoObservable, runInAction } from "mobx";
import toast from "react-hot-toast";
import { auth } from "../config/firebase";
import { cookie } from "../utils/auth";

interface AuthService {
  init: () => void;
  register: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

class EmailAuthService implements AuthService {
  init() {
    const uid = cookie.getCookie("uid");
    runInAction(() => {
      if (uid) authStore.uid = uid;
    });
  }

  register(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        cookie.setCookie("uid", user?.uid, 30);
        toast.success("註冊成功");
        runInAction(() => {
          authStore.uid = user?.uid;
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode === "auth/email-already-in-use") {
          toast.error("此信箱已被註冊");
        }
      });
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("登入成功");
        cookie.setCookie("uid", user?.uid, 30);
        runInAction(() => {
          authStore.uid = user?.uid;
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error("登入失敗");
        console.log(errorCode, errorMessage);
      });
  }

  logout() {
    signOut(auth)
      .then(() => {
        console.log("logout");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

class AuthStore {
  private authService: AuthService;
  uid: string | null = null;

  constructor(authService: AuthService) {
    makeAutoObservable(this);
    this.uid = localStorage.getItem("uid");
    this.authService = authService;
  }

  init() {
    this.authService.init();
  }

  register(email: string, password: string) {
    this.authService.register(email, password);
  }

  login(email: string, password: string) {
    this.authService.login(email, password);
  }

  logout() {
    this.authService.logout();
  }
}

const emailAuthService = new EmailAuthService();
export const authStore = new AuthStore(emailAuthService);
