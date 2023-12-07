import { Card, CardBody } from "@nextui-org/react";
import Animation from "./heading-animation.gif";

interface HeadingProps {
  title: string;
  subtitle: string;
  counts: number;
  gif?: string;
}

export const Heading = ({ title, subtitle, counts, gif }: HeadingProps) => {
  return (
    <>
      <Card className="flex h-20 w-full items-center bg-fourthDark">
        <CardBody className="flex flex-row justify-between overflow-hidden px-8">
          <section className="flex items-center justify-start gap-4">
            <h1 className="text-stone-100 text-3xl font-bold tracking-wide">
              {title}
            </h1>
            <h2 className="flex items-center leading-none text-primary">
              {" "}
              總共有
              <span className="mx-2 flex items-center text-2xl leading-none text-black">
                {counts || 0}
              </span>
              個{subtitle}
            </h2>
          </section>
          <figure className="h-28 w-28 -translate-y-2">
            <img src={gif || Animation} alt="An animation gif" />
          </figure>
        </CardBody>
      </Card>
    </>
  );
};
