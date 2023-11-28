import { Card, CardBody } from "@nextui-org/react";

interface BasicCardProps {
  children: React.ReactNode;
}

function BasicCard({ children }: BasicCardProps) {
  return (
    <Card fullWidth radius="sm">
      <CardBody className="my-2 flex min-h-[96px] flex-col pl-3">
        {children}
      </CardBody>
    </Card>
  );
}

export default BasicCard;
