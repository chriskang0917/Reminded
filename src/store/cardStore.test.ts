import { describe, expect, it } from "vitest";
import { NewCard } from "../models/NewCard";
import { CardStore, cardStatus } from "./cardStore";

const cardStore = new CardStore();

interface CardExample {
  content: string;
  tags: string[];
  status: cardStatus;
  update?: Partial<NewCard>;
}

const cardsExample: CardExample[] = [
  {
    content: "test idea card",
    tags: ["tag1", "tag2"],
    status: "idea",
  },
  {
    content: "test action card",
    tags: ["tag1", "tag2"],
    status: "action",
  },
  {
    content: "test action card",
    tags: ["tag1", "tag2"],
    status: "action",
    update: {
      dueDate: "2023-11-28T15:39:16.190Z",
    },
  },
  {
    content: "test todo card",
    tags: ["tag1", "tag2"],
    status: "todo",
    update: { dueDate: "2023-11-28T15:39:16.190Z" },
  },
  {
    content: "test done card",
    tags: ["tag1", "tag2"],
    status: "todo",
    update: { isArchived: true },
  },
];

describe("CardStore", () => {
  cardsExample.forEach((card) => {
    const newCard = new NewCard(card.content, card.tags, card.status);
    cardStore.addCard(newCard);
    if (card.update) {
      cardStore.updateCard(newCard.id, card.update);
    }
  });

  it("should be defined as cardStore", () => {
    expect(cardStore).toBeDefined();
  });
});
