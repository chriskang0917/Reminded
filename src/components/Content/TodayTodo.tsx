import { Card, CardBody, Divider, Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import Editable from "../Editable";

export const TodayTodo = observer(() => {
  const inputRef = useRef<HTMLInputElement>(null);
  const todoCards = cardStore.cards.filter((card) => card.status === "todo");

  return (
    <>
      <section className="flex w-[500px] flex-col items-center">
        <h1 className={style.mainTitle}>Today's Task</h1>
        <Divider />
        <div className="mt-4 grid w-full gap-3">
          {todoCards.map((card) => (
            <Card key={card.id} fullWidth>
              <CardBody className="my-2">
                <Editable
                  text={card.content}
                  placeholder="暫無內容..."
                  childRef={inputRef}
                >
                  <input
                    className="w-full bg-transparent outline-none"
                    defaultValue={card.content}
                    ref={inputRef}
                    name={cardStore.selectedTab}
                    placeholder="捕捉您的靈感..."
                  />
                </Editable>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
      <Spacer y={10} />
    </>
  );
});
