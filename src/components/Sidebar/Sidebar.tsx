import { Avatar, Card, CardBody, Tooltip, cn } from "@nextui-org/react";
import { motion } from "framer-motion";
import { AiOutlineInteraction } from "react-icons/ai";
import { BsListTask } from "react-icons/bs";
import { FaRegLightbulb, FaRegStickyNote } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { authStore } from "../../store/authStore";
import Logo from "./logo.png";

const actionList = [
  { label: "今日", page: "/", path: "/", icon: <IoHomeOutline /> },
  { label: "待辦", page: "/todo/", path: "/todo/today", icon: <BsListTask /> },
  {
    label: "行動",
    page: "/action/",
    path: "/action/all",
    icon: <AiOutlineInteraction />,
    id: "tutorial-ideas-3",
  },
  {
    label: "靈感",
    page: "/idea/",
    path: "/idea/week",
    icon: <FaRegLightbulb />,
    id: "tutorial-today-3",
  },
  {
    label: "筆記",
    page: "/notes/",
    path: "/notes/all",
    icon: <FaRegStickyNote />,
    id: "tutorial-ideas-5",
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const renderLogo = () => {
    return (
      <li className="absolute left-[22px] top-8">
        <Card className="h-9 w-9 rounded-full">
          <img src={Logo} alt="logo" />
        </Card>
      </li>
    );
  };

  const isNoteHomePage = (page: string) => {
    return pathname.includes(page) && pathname !== "/" && page !== "/";
  };
  const isHomePage = (page: string) => {
    return pathname === "/" && page === "/";
  };

  const renderButtons = () => {
    return actionList.map((action) => (
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
              id={action?.id}
              isBlurred
              shadow="lg"
              classNames={{
                base: "h-10 w-10 rounded-xl drop-shadow-2xl",
                body: cn(
                  "hover:bg-primaryDark hover:text-white transition-all",
                  isNoteHomePage(action.page)
                    ? "bg-primaryDark text-white"
                    : isHomePage(action.page)
                      ? "bg-primaryDark text-white"
                      : "bg-secondaryDark text-black",
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
    ));
  };

  const renderProfileButton = () => {
    return (
      <Avatar
        size="sm"
        showFallback
        classNames={{
          img: "w-10 rounded-xl",
          base: cn(
            "h-10 w-10 rounded-xl bg-secondaryDark text-slate-600 drop-shadow-2xl",
            "hover:bg-primaryDark hover:text-black transition-all",
            location.pathname === "/profile" && "bg-primaryDark",
          ),
        }}
        name={authStore.name || undefined}
        fallback={<RxAvatar className="text-slate-500 h-8 w-8" />}
      />
    );
  };

  return (
    <nav className="fixed left-0 top-0 hidden h-[100svh] w-36 flex-col items-center justify-between bg-secondary pr-10 opacity-60 md:flex">
      <ul className="mt-36 flex flex-col gap-7 pr-6">
        {renderLogo()}
        {renderButtons()}
      </ul>
      <ul className="mb-6 flex flex-col gap-4 pr-6">
        <li>
          <Link to="/profile">{renderProfileButton()}</Link>
        </li>
      </ul>
    </nav>
  );
};
