import { Card, CardBody, Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { AllCards, cardStore } from "../../../store/cardStore";

export const TodayReminder = observer(() => {
  const todoCards = cardStore
    .getFilteredCardsWith(new AllCards())
    .filter((card) => card.status === "remind");

  return (
    <section className="flex w-full flex-col items-center">
      <div className="mt-4 grid w-full gap-3">
        {todoCards.map((card) => (
          <Card key={card.id} fullWidth>
            <CardBody className="my-2"></CardBody>
          </Card>
        ))}
      </div>
      <Spacer y={10} />
    </section>
  );
});
