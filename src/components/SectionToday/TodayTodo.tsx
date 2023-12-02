import { Card, CardBody, Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { SiStarship } from "react-icons/si";
import { TodoTodayCards, cardStore } from "../../store/cardStore";
import { TodoCard } from "../Card";

export const TodayTodo = observer(() => {
  const todoCards = cardStore.getFilteredCardsWith(new TodoTodayCards());

  if (todoCards.length === 0) {
    return (
      <section className="flex flex-col items-center">
        <Card className="text-md mt-2 flex w-full flex-col items-center gap-2 tracking-wide">
          <CardBody className="my-5 flex flex-col items-center gap-2">
            <SiStarship className="text-5xl" />
            <Spacer y={1} />
            <span className="text-secondary">享受你的個人時光吧！</span>
          </CardBody>
        </Card>
        <Spacer y={10} />
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col items-center">
      <div className="mt-5 flex w-full gap-3">
        {todoCards.map((card) => (
          <TodoCard key={card.id} card={card} />
        ))}
      </div>
      <Spacer y={10} />
    </section>
  );
});
