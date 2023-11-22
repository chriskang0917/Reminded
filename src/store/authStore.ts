import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { makeAutoObservable } from "mobx";
import toast from "react-hot-toast";
import { auth } from "../config/firebase";

interface AuthService {
  register: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

class EmailAuthService implements AuthService {
  register(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        toast.success("登入成功");
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
  token: string | null = null;

  constructor(authService: AuthService) {
    makeAutoObservable(this);
    this.token = localStorage.getItem("token");
    this.authService = authService;
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
