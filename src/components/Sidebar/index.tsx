import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const actionList = [
  { label: "今日", path: "/" },
  { label: "待辦", path: "/todo" },
  { label: "行動", path: "/action/all" },
  { label: "靈感", path: "/idea/week" },
];
const settingList = [
  { label: "用戶", path: "/profile" },
  { label: "設定", path: "/setting" },
];

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
          <li key={action.label}>
            <Link to={action.path}>
              <SidebarButton>{action.label}</SidebarButton>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="mb-6 flex flex-col gap-4">
        {settingList.map((setting) => (
          <li key={setting.label}>
            <Link to={setting.path}>
              <SidebarButton>{setting.label}</SidebarButton>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
