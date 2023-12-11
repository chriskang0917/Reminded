import { observer } from "mobx-react-lite";
import { TodoAllCards, cardStore } from "../../../store/cardStore";
import { TodoCard } from "../../Card";
import { Heading, HeadingDivider } from "../../Heading";
import { TodoInput } from "../../Input";

const title = "所有待辦";
const subtitle = "待辦";

export const TodoAll = observer(() => {
  const todoCards = cardStore.getFilteredCardsWith(new TodoAllCards());

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={todoCards.length} />
      <TodoInput />
      <HeadingDivider />
      <ul className="grid w-full gap-3">
        {todoCards.map((card) => (
          <li key={card.id}>
            <TodoCard card={card} />
          </li>
        ))}
      </ul>
    </>
  );
});
