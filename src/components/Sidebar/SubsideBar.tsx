import { observer } from "mobx-react-lite";

interface SubsideBarProps {
  children: React.ReactNode;
}

export const SubsideBar = observer(({ children }: SubsideBarProps) => {
  return (
    <div className="bg-fourth fixed left-0 top-0 z-20 ml-20 h-[100svh] w-32 rounded-[40px] pt-20">
      <aside>
        <ul className="relative z-10 flex flex-col items-center justify-center gap-4 pt-4">
          {children}
        </ul>
      </aside>
      <div
        aria-label="backdrop"
        className="bg-fourth fixed top-0 z-0 ml-20 h-[100svh] w-full"
      />
    </div>
  );
});
