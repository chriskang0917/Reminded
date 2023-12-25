import { makeAutoObservable } from "mobx";

interface IDnd {
  disableDnd: () => void;
  enableDnd: () => void;
}

class Dnd implements IDnd {
  private uiStore: UiStore;

  constructor(uiStore: UiStore) {
    this.uiStore = uiStore;
  }

  disableDnd() {
    this.uiStore.isDndDisabled = true;
  }

  enableDnd() {
    this.uiStore.isDndDisabled = false;
  }
}

interface IShortcut {
  setInputEditing: () => void;
  stopInputEditing: () => void;
}

class Shortcut implements IShortcut {
  private uiStore: UiStore;

  constructor(uiStore: UiStore) {
    this.uiStore = uiStore;
  }

  setInputEditing() {
    this.uiStore.isInputEditing = true;
  }

  stopInputEditing() {
    this.uiStore.isInputEditing = false;
  }
}

class UiStore {
  private shortcut: IShortcut;
  private dnd: IDnd;

  isDndDisabled = false;
  isInputEditing = false;

  constructor() {
    makeAutoObservable(this);
    this.shortcut = new Shortcut(this);
    this.dnd = new Dnd(this);
  }

  get getIsDndDisabled() {
    return this.isDndDisabled;
  }

  get getIsInputEditing() {
    return this.isInputEditing;
  }

  disableDnd() {
    this.dnd.disableDnd();
  }

  enableDnd() {
    this.dnd.enableDnd();
  }

  setInputEditing() {
    this.shortcut.setInputEditing();
  }

  stopInputEditing() {
    this.shortcut.stopInputEditing();
  }
}

export const uiStore = new UiStore();
