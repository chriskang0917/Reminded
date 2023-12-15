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
import { NewCard, NewNote, cardStore } from "./cardStore";

interface IProfile {
  email: string;
  name: string;
}

interface ITutorial {
  today: boolean;
  idea: boolean;
  action: boolean;
  todo: boolean;
}

interface EmailService {
  initAuthState: () => void;
  initState: () => void;
  register: (email: string, password: string, callback?: () => void) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface SettingService {
  initUserSettings: () => void;
  updateProfile: (profile: IProfile) => void;
  updateTutorialProgress: (tutorialName: keyof ITutorial) => void;
  resetTutorialProgress: () => void;
}

/* ===============================
==========  Email Auth  ==========
=============================== */

class EmailAuthService implements EmailService {
  public authStore: AuthStore;
  private cookieExpireDay = 10;

  constructor(authStore: AuthStore) {
    this.authStore = authStore;
  }

  initAuthState() {
    if (!cookie.getCookie("uid")) return;
    auth.onAuthStateChanged((user) => {
      if (user) {
        runInAction(() => {
          this.authStore.uid = user.uid;
          this.authStore.isLogin = true;
        });
      } else {
        runInAction(() => {
          this.authStore.isLogin = false;
        });
      }
    });
  }

  initState() {
    if (!this.authStore.uid) return;
    onSnapshot(doc(db, "users", this.authStore.uid), (doc) => {
      try {
        if (!doc.exists()) throw new Error("profile_not_exist");
        runInAction(() => {
          this.authStore.name = doc.data()?.name;
          this.authStore.email = doc.data()?.email;
          this.authStore.uid = doc.data()?.uid;
        });
      } catch (error) {
        console.error("init_state_error", error);
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
          this.authStore.uid = user?.uid;
          this.authStore.isLogin = true;
        });
      })
      .then(() => {
        if (!this.authStore.uid) return;
        const profileRef = doc(db, "users", this.authStore.uid);
        const randomName = `User_${Math.floor(Math.random() * 10000)}`;
        runInAction(() => (this.authStore.name = randomName));

        setDoc(profileRef, {
          name: this.authStore.name,
          uid: this.authStore.uid,
          email,
        });
      })
      .then(() => {
        const newCard1 = new NewCard("將靈感轉換成具體行動", [], "idea");
        const newCard2 = new NewCard("今日待辦，可以調整到期日", [], "todo");
        const newCard3 = new NewCard("行動設定到期會轉換成待辦", [], "action");
        const newNote = new NewNote(
          "範例筆記",
          "新增你喜歡的內容",
          "<p>新增你喜歡的內容</p>",
          [],
        );
        const cardOrderList = [
          newCard1.id,
          newCard2.id,
          newCard3.id,
          newNote.id,
        ];
        cardStore.addCard(newCard1);
        cardStore.addCard(newCard2);
        cardStore.addCard(newCard3);
        cardStore.addNote(newNote);
        cardStore.addCardToFireStore(newCard1);
        cardStore.addCardToFireStore(newCard2);
        cardStore.addCardToFireStore(newCard3);
        cardStore.addNoteToFireStore(newNote);
        cardStore.updateCardOrderList(cardOrderList);
        cardStore.updateCardOrderListToFirebase(cardOrderList);
      })
      .catch((error) => {
        const errorCode = error.code || "";
        const errorMessage = error.message;

        if (errorCode === "auth/email-already-in-use") {
          toast.error("此信箱已被註冊");
        }

        if (errorCode === "auth/weak-password") {
          toast.error("密碼請超過 6 位數");
        }

        if (errorCode === "auth/invalid-email") {
          toast.error("信箱格式錯誤");
        }

        console.error(errorCode, errorMessage);
        if (callback) callback("error");
      });
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        toast.success("登入成功");
        cookie.setCookie("uid", user?.uid, this.cookieExpireDay);

        runInAction(() => {
          this.authStore.uid = user?.uid;
          this.authStore.email = user?.email;
          this.authStore.isLogin = true;
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        toast.error("登入失敗");
        console.error(errorCode, errorMessage);
      });
  }

  logout() {
    cookie.deleteCookie("uid");
    localStorage.removeItem("settings");
    runInAction(() => {
      this.authStore.isLogin = false;
      this.authStore.uid = null;
    });

    signOut(auth)
      .then(() => toast.success("登出成功"))
      .catch((error) => console.error("sign_out_error", error));
  }
}

/* ===============================
=========  Setting Auth  =========
=============================== */

class SettingAuthService implements SettingService {
  public authStore: AuthStore;

  constructor(authStore: AuthStore) {
    this.authStore = authStore;
  }

  initUserSettings() {
    if (!this.authStore.uid) return;
    const settingRef = doc(db, "users", this.authStore.uid);
    onSnapshot(settingRef, (doc) => {
      if (doc.data()?.tutorialProgress) {
        return runInAction(() => {
          this.authStore.tutorialProgress = doc.data()?.tutorialProgress;
        });
      }

      localStorage.removeItem("settings");
      const settings = localStorage.getItem("settings");

      if (settings) {
        const parsedSettings = JSON.parse(settings);
        return runInAction(() => {
          this.authStore.tutorialProgress = parsedSettings.tutorialProgress;
        });
      }

      const initSetting = {
        tutorialProgress: {
          today: false,
          idea: false,
          action: false,
          todo: false,
        },
      };

      localStorage.setItem("settings", JSON.stringify(initSetting));
      runInAction(() => {
        this.authStore.tutorialProgress = initSetting.tutorialProgress;
      });
    });
  }

  async updateProfile({ name, email }: IProfile) {
    const uid = this.authStore.uid;
    if (!uid) return;

    try {
      const profileRef = doc(db, "users", uid);
      await setDoc(profileRef, { uid, email, name });

      toast.success("更新成功");
      runInAction(() => {
        this.authStore.name = name;
        this.authStore.email = email;
      });
    } catch (error) {
      toast.error("更新失敗");
      console.error(error);
    }
  }

  updateTutorialProgress(tutorialName: keyof ITutorial) {
    if (Object.keys(this.authStore.tutorialProgress || {}).length === 0) return;

    runInAction(() => {
      this.authStore.tutorialProgress[tutorialName] = true;
    });

    localStorage.setItem(
      "settings",
      JSON.stringify({ tutorialProgress: this.authStore.tutorialProgress }),
    );

    if (!this.authStore.uid) return;
    const settingRef = doc(db, "users", this.authStore.uid);
    setDoc(
      settingRef,
      {
        tutorialProgress: this.authStore.tutorialProgress,
      },
      { merge: true },
    );
  }

  resetTutorialProgress() {
    if (!this.authStore.uid) return;
    const defaultTutorial = {
      today: false,
      idea: false,
      action: false,
      todo: false,
    };
    localStorage.setItem("settings", JSON.stringify(defaultTutorial));
    const settingRef = doc(db, "users", this.authStore.uid);
    setDoc(
      settingRef,
      {
        tutorialProgress: {
          today: false,
          idea: false,
          action: false,
          todo: false,
        },
      },
      { merge: true },
    );
    runInAction(() => {
      this.authStore.tutorialProgress = {
        today: false,
        idea: false,
        action: false,
        todo: false,
      } as ITutorial;
    });
  }
}

class AuthStore {
  private emailService: EmailService;
  private settingService: SettingService;

  public isLogin = true;
  public uid: string | null = null;
  public name: string | null = null;
  public email: string | null = null;
  public favoriteIdeaTags: string[] = [];
  public favoriteActionTags: string[] = [];
  public favoriteTodoTags: string[] = [];
  public tutorialProgress: ITutorial = {} as ITutorial;

  constructor() {
    makeAutoObservable(this);
    this.emailService = new EmailAuthService(this);
    this.settingService = new SettingAuthService(this);
  }

  initAuthState() {
    this.emailService.initAuthState();
  }

  async initState() {
    this.emailService.initState();
  }

  register(email: string, password: string, callback?: () => void) {
    this.emailService.register(email, password, callback);
  }

  login(email: string, password: string) {
    this.emailService.login(email, password);
  }

  logout() {
    this.emailService.logout();
  }

  initUserSettings() {
    this.settingService.initUserSettings();
  }

  updateProfile(profile: IProfile) {
    this.settingService.updateProfile(profile);
  }

  updateTutorialProgress(tutorialName: keyof ITutorial) {
    this.settingService.updateTutorialProgress(tutorialName);
  }

  resetTutorialProgress() {
    this.settingService.resetTutorialProgress();
  }
}

export const authStore = new AuthStore();
