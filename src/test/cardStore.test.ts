import { describe, expect, it } from "vitest";
import { NewCard } from "../models/NewCard";
import {
  AllCards,
  CardStore,
  TodoAllCards,
  cardStatus,
} from "../store/cardStore";

const testCardStore = new CardStore();

interface CardExample {
  content: string;
  tags: string[];
  status: cardStatus;
  update?: Partial<NewCard>;
}

const cardsExample: CardExample[] = [
  {
    content: "idea card",
    tags: ["tag1", "tag2"],
    status: "idea",
  },
  {
    content: "archived idea card",
    tags: ["tag1", "tag3"],
    status: "idea",
    update: { isArchived: true },
  },
  {
    content: "action card",
    tags: ["tag4", "tag2"],
    status: "action",
  },
  {
    content: "action-todo card",
    tags: ["tag1", "tag2"],
    status: "action",
    update: { dueDate: "2023-11-28T15:39:16.190Z" },
  },
  {
    content: "archived action-todo card",
    tags: ["tag1", "tag2"],
    status: "action",
    update: {
      dueDate: "2023-11-28T15:39:16.190Z",
      isArchived: true,
    },
  },
  {
    content: "todo card",
    tags: ["tag1", "tag2"],
    status: "todo",
  },
  {
    content: "todo card with due date",
    tags: ["tag1", "tag2"],
    status: "todo",
    update: { dueDate: "2023-11-28T15:39:16.190Z" },
  },
  {
    content: "test archived todo card",
    tags: ["tag1", "tag2"],
    status: "todo",
    update: { dueDate: "2023-11-28T15:39:16.190Z", isArchived: true },
  },
];

describe("CardStore Cards", () => {
  cardsExample.forEach((card) => {
    const newCard = new NewCard(card.content, card.tags, card.status);
    const cardOrderList = [...testCardStore.cardOrderList, newCard.id];

    testCardStore.addCard(newCard);
    if (card.update) testCardStore.updateCard(newCard.id, card.update);
    testCardStore.updateCardOrderList(cardOrderList);
  });

  it("should be contained 8 cards", () => {
    const allCards = Object.keys(testCardStore.cards);
    expect(allCards).toHaveLength(8);
  });

  it("should get all 8 cards", () => {
    const allCards = testCardStore.getFilteredCardsWith(
      new AllCards(testCardStore),
    );
    expect(allCards).toHaveLength(8);
  });

  it("should get 3 todo-all cards", () => {
    const todoAllCards = testCardStore.getFilteredCardsWith(
      new TodoAllCards(testCardStore),
    );
    expect(todoAllCards).toHaveLength(3);
  });
});
