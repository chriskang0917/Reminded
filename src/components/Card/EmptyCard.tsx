import { Card, CardBody, Spacer } from "@nextui-org/react";
import { RocketIcon } from "./RocketIcon";

function EmptyCard({ id, placeholder }: { id?: string; placeholder: string }) {
  return (
    <Card
      id={id}
      className="text-md mt-2 flex h-[170px] w-full flex-col items-center gap-2 tracking-wide"
    >
      <CardBody className="my-5 flex flex-col items-center gap-2">
        <RocketIcon className="h-12 w-12 text-secondary" />
        <Spacer y={1} />
        <span className="text-secondary">{placeholder}</span>
      </CardBody>
    </Card>
  );
}

export default EmptyCard;
