import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";
import toast from "react-hot-toast";
import { auth, db } from "../config/firebase";
import { cookie } from "../utils/cookie";

interface IProfile {
  email: string;
  name: string;
}

interface AuthService {
  init: () => void;
  register: (email: string, password: string, callback?: () => void) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  updateProfile: (profile: IProfile) => void;
}

class EmailAuthService implements AuthService {
  async init() {
    const uid = cookie.getCookie("uid");
    const profileRef = doc(db, "users", uid);
    await getDoc(profileRef).then((doc) => {
      if (doc.exists()) {
        runInAction(() => {
          authStore.name = doc.data()?.name;
          authStore.email = doc.data()?.email;
        });
      }
    });
  }

  register(
    email: string,
    password: string,
    callback?: (message?: string) => void,
  ) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        cookie.setCookie("uid", user?.uid, 30);

        toast.success("註冊成功");
        if (callback) callback("success");

        runInAction(() => {
          authStore.uid = user?.uid;
          authStore.isLogin = true;
        });
      })
      .then(() => {
        if (!authStore.uid) return;
        const profileRef = doc(db, "users", authStore.uid);
        authStore.name = `User_${Math.floor(Math.random() * 10000)}`;
        setDoc(profileRef, {
          name: authStore.name,
          uid: authStore.uid,
          email,
        });
      })
      .catch((error) => {
        const errorCode = error.code || "";
        const errorMessage = error.message;

        if (errorCode === "auth/email-already-in-use") {
          toast.error("此信箱已被註冊");
        }

        console.log(errorCode, errorMessage);
        if (callback) callback("error");
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
          authStore.isLogin = true;
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
        cookie.deleteCookie("uid");
        toast.success("登出成功");
        runInAction(() => (authStore.uid = null));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async updateProfile({ name, email }: IProfile) {
    if (!authStore.uid) return;
    const profileRef = doc(db, "users", authStore.uid);
    try {
      await setDoc(profileRef, {
        uid: authStore.uid,
        email,
        name,
      });
      toast.success("更新成功");
      runInAction(() => {
        authStore.name = name;
        authStore.email = email;
      });
    } catch (error) {
      console.error(error);
      toast.error("更新失敗");
    }
  }
}

class AuthStore {
  private authService: AuthService;
  public isLogin = false;
  public uid: string | null = null;
  public name: string | null = null;
  public email: string | null = null;

  constructor(authService: AuthService) {
    makeAutoObservable(this);
    this.authService = authService;
  }

  async init() {
    this.authService.init();
  }

  register(email: string, password: string, callback?: () => void) {
    this.authService.register(email, password, callback);
  }

  login(email: string, password: string) {
    this.authService.login(email, password);
  }

  logout() {
    this.authService.logout();
  }

  updateProfile(profile: IProfile) {
    this.authService.updateProfile(profile);
  }
}

const emailAuthService = new EmailAuthService();
export const authStore = new AuthStore(emailAuthService);
