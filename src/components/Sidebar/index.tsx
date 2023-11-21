import { Button } from "@nextui-org/react";

const actionList = ["今日", "待辦", "行動", "靈感"];
const settingList = ["用戶", "設定"];

function Sidebar() {
  const SidebarButton = ({ children }: { children: React.ReactNode }) => (
    <Button className="flex h-16 w-16 items-center justify-center" size="sm">
      {children}
    </Button>
  );

  return (
    <nav className="fixed left-0 top-0 flex h-[100svh] w-20 flex-col items-center justify-between bg-gray-100">
      <ul className="mt04 mt-4 flex flex-col gap-5">
        {actionList.map((action) => (
          <li key={action}>
            <SidebarButton>{action}</SidebarButton>
          </li>
        ))}
      </ul>
      <ul className="mb-6 flex flex-col gap-4">
        {settingList.map((setting) => (
          <li key={setting}>
            <SidebarButton>{setting}</SidebarButton>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
