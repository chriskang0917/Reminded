import { ScrollShadow, cn } from "@nextui-org/react";

interface SectionShadowProps {
  children: React.ReactNode;
  className?: string;
}

function SectionShadow({ children, className }: SectionShadowProps) {
  return (
    <ScrollShadow
      className={cn(
        "flex w-full flex-col gap-3 px-4 py-3",
        "h-[calc(100svh-250px)]",
        className,
      )}
      hideScrollBar
      size={20}
    >
      <ul className="grid w-full gap-3">{children}</ul>
    </ScrollShadow>
  );
}

export default SectionShadow;
