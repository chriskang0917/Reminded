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
      <Card className="relative left-[24%] -mt-6 flex h-12 w-8/12 items-center bg-fourthDark md:left-0 md:mt-0 md:h-20 md:w-full">
        <CardBody className="flex flex-row justify-center overflow-hidden px-8 md:justify-between">
          <section className="flex items-center justify-start gap-4">
            <h1 className="text-2xl font-bold tracking-wide text-stone-100 md:text-3xl">
              {title}
            </h1>
            <h2 className="hidden items-center leading-none text-primary md:flex">
              {" "}
              總共有
              <span className="mx-2 flex items-center text-2xl leading-none text-black">
                {counts || 0}
              </span>
              個{subtitle}
            </h2>
          </section>
          <figure className="hidden h-28 w-28 -translate-y-2 md:block">
            <img src={gif || Animation} alt="An animation gif" />
          </figure>
        </CardBody>
      </Card>
    </>
  );
};
