import { ScrollShadow, cn } from "@nextui-org/react";

interface SectionShadowProps {
  children: React.ReactNode;
  className?: string;
}

function SectionShadow({ children, className }: SectionShadowProps) {
  return (
    <ScrollShadow
      className={cn("mt-5 flex w-full flex-col gap-3 p-5", className)}
      hideScrollBar
      size={10}
    >
      {children}
    </ScrollShadow>
  );
}

export default SectionShadow;
