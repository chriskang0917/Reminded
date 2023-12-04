import { Avatar, Card, CardBody, Tooltip, cn } from "@nextui-org/react";
import { motion } from "framer-motion";
import { AiOutlineInteraction } from "react-icons/ai";
import { BsListTask } from "react-icons/bs";
import { FaRegLightbulb, FaRegStickyNote } from "react-icons/fa";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { authStore } from "../../store/authStore";

const actionList = [
  { label: "今日", path: "/", icon: <IoHomeOutline /> },
  { label: "待辦", path: "/todo/today", icon: <BsListTask /> },
  { label: "行動", path: "/action/all", icon: <AiOutlineInteraction /> },
  { label: "靈感", path: "/idea/week", icon: <FaRegLightbulb /> },
  { label: "筆記", path: "/notes/all", icon: <FaRegStickyNote /> },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <nav className="fixed left-0 top-0 flex h-[100svh] w-36 flex-col items-center justify-between bg-secondary pr-10 opacity-70">
      <ul className="mt-36 flex flex-col gap-7 pr-6">
        {actionList.map((action) => (
          <li key={action.label}>
            <Link to={action.path}>
              <Tooltip
                content={action.label}
                showArrow
                color="secondary"
                placement="right"
                delay={300}
                closeDelay={100}
              >
                <Card
                  isBlurred
                  classNames={{
                    base: "h-10 w-10 rounded-xl drop-shadow-2xl",
                    body: cn(
                      location.pathname === action.path
                        ? "bg-primary text-white"
                        : "bg-thirdDark text-black",
                      "hover:bg-primary hover:text-white transition-all",
                    ),
                  }}
                >
                  <CardBody className="flex items-center justify-center">
                    <motion.div className="flex flex-col items-center justify-center">
                      {action.icon}
                    </motion.div>
                  </CardBody>
                </Card>
              </Tooltip>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="mb-6 flex flex-col gap-4 pr-6">
        <li>
          <Link to="/profile">
            <Avatar
              size="sm"
              showFallback
              classNames={{
                img: "w-10 rounded-xl",
                base: cn(
                  "h-10 w-10 rounded-xl bg-thirdDark text-slate-600 drop-shadow-2xl",
                  "hover:bg-primary hover:text-black transition-all",
                  location.pathname === "/profile" && "bg-primary",
                ),
              }}
              name={authStore.name || undefined}
              fallback={<RxAvatar className="text-gray-400 h-8 w-8" />}
            />
          </Link>
        </li>
        <li>
          <Link to="/setting">
            <Card
              isBlurred
              classNames={{
                base: cn(
                  "h-10 w-10 rounded-xl bg-thirdDark text-white drop-shadow-2xl",
                  "hover:bg-primary hover:text-black transition-all",
                  location.pathname === "/setting" && "bg-primary",
                ),
              }}
            >
              <CardBody>
                <IoSettingsOutline />
              </CardBody>
            </Card>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
