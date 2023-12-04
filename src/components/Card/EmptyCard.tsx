import { Card, CardBody, Spacer } from "@nextui-org/react";
import { SiStarship } from "react-icons/si";

function EmptyCard() {
  return (
    <Card className="text-md mt-2 flex h-[170px] w-full flex-col items-center gap-2 tracking-wide">
      <CardBody className="my-5 flex flex-col items-center gap-2">
        <SiStarship className="text-5xl" />
        <Spacer y={1} />
        <span className="text-secondary">享受你的個人時光吧！</span>
      </CardBody>
    </Card>
  );
}

export default EmptyCard;
