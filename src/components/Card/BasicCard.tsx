import { Card, CardBody, cn } from "@nextui-org/react";
import { ICard } from "../../store/cardStore";
import { SortableItem } from "../DND/SortableItem";

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
          className={cn("my-2 flex min-h-[96px] flex-col pl-3", className)}
        >
          {children}
        </CardBody>
      </Card>
    </SortableItem>
  );
}

export default BasicCard;
