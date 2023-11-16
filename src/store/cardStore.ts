import { makeAutoObservable } from "mobx";

interface Card {
  id: number;
  content: string;
}

export class CardStore {
  number = 5;
  cards: Card[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.number++;
  }
}

export const cardStore = new CardStore();
