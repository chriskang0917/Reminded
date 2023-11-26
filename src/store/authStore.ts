import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";
import toast from "react-hot-toast";
import { auth, db } from "../config/firebase";
import { cookie } from "../utils/cookie";

interface IProfile {
  email: string;
  name: string;
}

interface AuthService {
  initAuthState: () => void;
  initState: () => void;
  register: (email: string, password: string, callback?: () => void) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  updateProfile: (profile: IProfile) => void;
}

class EmailAuthService implements AuthService {
  private cookieExpireDay = 10;

  initAuthState() {
    if (!cookie.getCookie("uid")) return;
    auth.onAuthStateChanged((user) => {
      if (user) {
        runInAction(() => {
          authStore.uid = user.uid;
          authStore.isLogin = true;
        });
      } else {
        runInAction(() => {
          authStore.isLogin = false;
        });
      }
    });
  }

  initState() {
    if (!authStore.uid) return;
    onSnapshot(doc(db, "users", authStore.uid), (doc) => {
      try {
        if (!doc.exists()) throw new Error("profile_not_exist");
        runInAction(() => {
          authStore.name = doc.data()?.name;
          authStore.email = doc.data()?.email;
          authStore.uid = doc.data()?.uid;
        });
      } catch (error) {
        console.log("init_state_error", error);
      }
    });
  }

  register(
    email: string,
    password: string,
    callback?: (message?: string) => void,
  ) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        cookie.setCookie("uid", user?.uid, this.cookieExpireDay);
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
        const randomName = `User_${Math.floor(Math.random() * 10000)}`;
        authStore.name = randomName;

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
      .then(({ user }) => {
        toast.success("登入成功");
        cookie.setCookie("uid", user?.uid, this.cookieExpireDay);

        runInAction(() => {
          authStore.uid = user?.uid;
          authStore.email = user?.email;
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
    cookie.deleteCookie("uid");
    runInAction(() => {
      authStore.isLogin = false;
      authStore.uid = null;
    });

    signOut(auth)
      .then(() => toast.success("登出成功"))
      .catch((error) => console.log("sign_out_error", error));
  }

  async updateProfile({ name, email }: IProfile) {
    const uid = authStore.uid;
    if (!uid) return;

    try {
      const profileRef = doc(db, "users", uid);
      await setDoc(profileRef, { uid, email, name });

      toast.success("更新成功");
      runInAction(() => {
        authStore.name = name;
        authStore.email = email;
      });
    } catch (error) {
      toast.error("更新失敗");
      console.error(error);
    }
  }
}

class AuthStore {
  private authService: AuthService;
  public isLogin = true;
  public uid: string | null = null;
  public name: string | null = null;
  public email: string | null = null;
  public favoriteIdeaTags: string[] = [];
  public favoriteActionTags: string[] = [];
  public favoriteTodoTags: string[] = [];

  constructor(authService: AuthService) {
    makeAutoObservable(this);
    this.authService = authService;
  }

  initAuthState() {
    this.authService.initAuthState();
  }

  async initState() {
    this.authService.initState();
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
