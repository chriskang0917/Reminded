import { Card, CardBody } from "@nextui-org/react";
import { ICard } from "../../store/cardStore";
import { SortableItem } from "../DND/SortableItem";

interface BasicCardProps {
  card: ICard;
  children: React.ReactNode;
}

function BasicCard({ card, children }: BasicCardProps) {
  return (
    <SortableItem card={card}>
      <Card fullWidth radius="sm">
        <CardBody className="my-2 flex min-h-[96px] flex-col pl-3">
          {children}
        </CardBody>
      </Card>
    </SortableItem>
  );
}

export default BasicCard;
