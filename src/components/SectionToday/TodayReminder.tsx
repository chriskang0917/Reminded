import { Card, CardBody, Divider, Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { IoFilterOutline } from "react-icons/io5";
import { CardsType, cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";

export const TodayReminder = observer(() => {
  const todoCards = cardStore
    .getFilteredCardsWith(CardsType.All)
    .filter((card) => card.status === "remind");

  return (
    <section className="flex w-full flex-col items-center">
      <div className="flex w-full justify-between">
        <h1 className={style.subTitle}>Today's Reminder</h1>
        <IoFilterOutline className=" text-lg" />
      </div>
      <Divider />
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
