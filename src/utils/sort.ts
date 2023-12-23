import { ICard, ICardObject } from "./../store/cardStore";

export const sort = {
  sortCardsDescBy(strategy: string, cards: ICard[]) {
    switch (strategy) {
      case "dueDate":
        return cards.sort((a, b) => {
          if (a.dueDate === null) return 1;
          if (b.dueDate === null) return -1;
          if (a.dueDate > b.dueDate) return -1;
          if (a.dueDate < b.dueDate) return 1;
          return 0;
        });
      case "createdTime":
        return cards.sort((a, b) => {
          if (a.createdTime > b.createdTime) return -1;
          if (a.createdTime < b.createdTime) return 1;
          return 0;
        });
      default:
        return cards;
    }
  },
  getSortedCardsByOrderList(cardOrderList: string[], cardsObject: ICardObject) {
    const sortedCards: ICard[] = [];
    cardOrderList.forEach((id) => {
      if (cardsObject.hasOwnProperty(id)) sortedCards.push(cardsObject[id]);
    });
    return sortedCards;
  },
};
