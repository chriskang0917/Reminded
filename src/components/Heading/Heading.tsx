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
      <Card className="relative left-[20%] -mt-6 flex h-12 w-[75%] items-center bg-fourthDark min-[660px]:left-[4%] min-[660px]:w-11/12 md:left-0 md:mt-0 md:h-20 md:w-full">
        <CardBody className="flex flex-row justify-center overflow-hidden md:justify-between md:px-8">
          <section className="flex items-center justify-start gap-4">
            <h1 className="mb-1 text-2xl font-bold tracking-wide text-stone-100 md:mb-0 md:text-3xl">
              {title}
            </h1>
            <h2 className="hidden items-center text-sm leading-none text-primary min-[320px]:flex md:text-base">
              <p className="hidden md:block"> 總共有</p>
              <span className="mx-2 flex items-center text-xl leading-none text-black md:text-2xl">
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
