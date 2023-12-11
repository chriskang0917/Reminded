import { Card, CardBody, cn } from "@nextui-org/react";
import { ICard } from "../../store/cardStore";
import { SortableItem } from "../DND";
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
        <CardBody className={cn("min-h-20 my-2 flex flex-col pl-3", className)}>
          {children}
          {card.status !== "note" && (
            <div className="mt-2 flex flex-wrap items-center gap-x-2">
              <CardTags card={card} />
            </div>
          )}
        </CardBody>
      </Card>
    </SortableItem>
  );
}

export default BasicCard;
