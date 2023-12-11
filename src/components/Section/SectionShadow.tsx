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
      {children}
    </ScrollShadow>
  );
}

export default SectionShadow;
