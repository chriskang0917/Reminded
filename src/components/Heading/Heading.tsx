import { Card, CardBody, Divider } from "@nextui-org/react";
import Animation from "./heading-animation.gif";

interface HeadingProps {
  title: string;
  subtitle?: string;
  counts?: number;
}

export const Heading = ({ title, subtitle, counts }: HeadingProps) => {
  return (
    <>
      <Card className="flex h-20 w-full items-center bg-fourthDark">
        <CardBody className="flex flex-row justify-between overflow-hidden px-8">
          <div className="flex items-center justify-start gap-4">
            <h1 className="text-stone-100 text-3xl font-bold tracking-wide">
              {title}
            </h1>
            <h2 className="flex items-center leading-none text-primary">
              總共有
              <span className="mx-2 flex items-center text-2xl leading-none text-black">
                {counts}
              </span>
              個{subtitle}
            </h2>
          </div>
          <figure className="h-28 w-28 -translate-y-2">
            <img src={Animation} alt="An animation gif" />
          </figure>
        </CardBody>
      </Card>
      <Divider className="my-4 w-full" />
    </>
  );
};
