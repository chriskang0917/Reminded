import { observer } from "mobx-react-lite";

interface SubsideBarProps {
  children: React.ReactNode;
}

export const SubsideBar = observer(({ children }: SubsideBarProps) => {
  return (
    <div className="fixed left-0 top-0 z-20 ml-20 h-[100svh] w-40 rounded-[40px] bg-fourth pt-28 shadow-md">
      <aside>
        <ul className="relative z-10 flex flex-col items-center justify-center gap-4 pt-4">
          {children}
        </ul>
      </aside>
      <div
        aria-label="backdrop"
        className="fixed top-0 z-0 ml-20 h-[100svh] w-full bg-fourth"
      />
    </div>
  );
});
