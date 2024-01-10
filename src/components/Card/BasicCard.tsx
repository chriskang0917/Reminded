import { Card, CardBody, cn } from "@nextui-org/react";
import { ICard } from "../../store/cardStore";
import { SortableItem } from "../Dnd";
import CardTags from "./CardTags";

interface BasicCardProps {
  card: ICard;
  className?: string;
  children?: React.ReactNode;
}

function BasicCard({ card, children, className }: BasicCardProps) {
  return (
    <SortableItem card={card}>
      <Card fullWidth radius="sm">
        <CardBody
          className={cn(
            "min-h-20 my-1 flex cursor-default flex-col",
            "text-sm md:text-base",
            className,
          )}
        >
          {children}
          {card.status !== "note" && (
            <div className="mt-2 flex max-w-[calc(100%-100px)] flex-wrap items-center gap-x-2">
              <CardTags card={card} />
            </div>
          )}
        </CardBody>
      </Card>
    </SortableItem>
  );
}

export default BasicCard;
