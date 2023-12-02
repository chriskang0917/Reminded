import { Link } from "react-router-dom";

const actionList = [
  { label: "今日", path: "/" },
  { label: "待辦", path: "/todo/today" },
  { label: "行動", path: "/action/all" },
  { label: "靈感", path: "/idea/week" },
  { label: "筆記", path: "/notes/all" },
];
const settingList = [
  { label: "用戶", path: "/profile" },
  { label: "設定", path: "/setting" },
];

export const Sidebar = () => {
  return (
    <nav className="bg-third fixed left-0 top-0 flex h-[100svh] w-36 flex-col items-center justify-between pr-10">
      <ul className="mt04 mt-20 flex flex-col gap-5 pr-6">
        {actionList.map((action) => (
          <li key={action.label}>
            <Link to={action.path}>
              <button>{action.label}</button>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="mb-6 flex flex-col gap-4 pr-6">
        {settingList.map((setting) => (
          <li key={setting.label}>
            <Link to={setting.path}>
              <button>{setting.label}</button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
