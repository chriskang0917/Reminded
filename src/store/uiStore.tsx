import { makeAutoObservable } from "mobx";

class UiStore {
  isDndDisabled = false;

  constructor() {
    makeAutoObservable(this);
  }

  disableDnd() {
    this.isDndDisabled = true;
  }

  enableDnd() {
    this.isDndDisabled = false;
  }
}

export const uiStore = new UiStore();
