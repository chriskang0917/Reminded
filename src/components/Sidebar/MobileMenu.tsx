import { Accordion, AccordionItem, ScrollShadow, cn } from "@nextui-org/react";
import { useState } from "react";
import { AiOutlineInteraction } from "react-icons/ai";
import { BsListTask } from "react-icons/bs";
import { CiMenuBurger } from "react-icons/ci";
import { FaRegLightbulb, FaRegStickyNote } from "react-icons/fa";
import { IoCloseOutline, IoHomeOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const transformStyle = "translate-y-[2px]";

const titles = [
  {
    title: "今日",
    icon: <IoHomeOutline className={transformStyle} />,
    subtitles: [{ subtitle: "今日靈感 / 待辦", path: "/" }],
  },
  {
    title: "待辦",
    icon: <BsListTask className={transformStyle} />,
    subtitles: [
      { subtitle: "明日待辦", path: "/todo/tomorrow" },
      { subtitle: "本週待辦", path: "/todo/week" },
      { subtitle: "過期待辦", path: "/todo/expired" },
      { subtitle: "所有待辦", path: "/todo/all" },
      { subtitle: "已完成待辦", path: "/todo/complete" },
    ],
  },
  {
    title: "行動",
    icon: <AiOutlineInteraction className={transformStyle} />,
    subtitles: [
      { subtitle: "所有行動", path: "/action/all" },
      { subtitle: "搜尋行動", path: "/action/search" },
      { subtitle: "已過期行動", path: "/action/expired" },
      { subtitle: "已執行行動", path: "/action/executed" },
      { subtitle: "已封存行動", path: "/action/archive" },
    ],
  },
  {
    title: "靈感",
    icon: <FaRegLightbulb className={transformStyle} />,
    subtitles: [
      { subtitle: "本週靈感", path: "/idea/week" },
      { subtitle: "搜尋靈感", path: "/idea/search" },
      { subtitle: "所有靈感", path: "/idea/all" },
      { subtitle: "已轉換靈感", path: "/idea/action" },
      { subtitle: "已封存靈感", path: "/idea/archive" },
    ],
  },
  {
    title: "筆記",
    icon: <FaRegStickyNote className={transformStyle} />,
    subtitles: [
      { subtitle: "所有筆記", path: "/notes/all" },
      { subtitle: "搜尋筆記", path: "/notes/search" },
    ],
  },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const renderHamburgerButton = () => {
    return (
      <div
        className={cn(
          "fixed left-5 top-5 z-[9999] h-10 w-10",
          "flex items-center justify-center md:hidden",
          "bg-fourth",
          "rounded-full drop-shadow-md",
          isOpen ? "text-secondary" : "text-primary",
          "hover:text-secondary",
        )}
      >
        {isOpen ? (
          <IoCloseOutline
            className="fixed z-50"
            size={20}
            onClick={handleMenuToggle}
          />
        ) : (
          <CiMenuBurger
            className="fixed z-50"
            size={20}
            onClick={handleMenuToggle}
          />
        )}
      </div>
    );
  };

  const renderMenu = () => {
    return (
      <div
        className={cn(
          "fixed left-0 z-50 h-[100svh] w-[90svw] pl-12 pr-5 pt-20",
          "rounded-[40px] bg-white drop-shadow-md",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-[-35px]" : "translate-x-[-100%]",
        )}
      >
        <ScrollShadow
          className="max-h-[85svh] p-2"
          hideScrollBar
          size={30}
          offset={0}
        >
          <Accordion
            selectionMode="multiple"
            variant="light"
            defaultExpandedKeys={["今日"]}
          >
            {titles.map(({ title, subtitles: subtitles, icon }) => (
              <AccordionItem
                className="font-bold text-secondary"
                key={title}
                title={title}
                aria-label={title}
                startContent={icon}
              >
                <ul className="border-thirdLight mb-2 ml-2 flex flex-col gap-4 border-l-1 font-normal tracking-wide">
                  {subtitles?.map(({ subtitle, path }) => {
                    return (
                      <li
                        className="ml-2 flex items-center gap-2"
                        key={subtitle}
                      >
                        <Link
                          to={path}
                          className="flex w-full items-center gap-2"
                          onClick={handleMenuToggle}
                        >
                          <h2
                            className={cn(
                              "w-full rounded-md py-2 pl-2",
                              "text-secondary",
                              "transition-all duration-300 ease-in-out",
                              location.pathname === path &&
                                "bg-fourth/80 text-primaryDark drop-shadow-sm",
                            )}
                          >
                            {subtitle}
                          </h2>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollShadow>
      </div>
    );
  };

  const renderBackdrop = () => {
    return (
      <div
        className="fixed left-0 top-0 z-40 h-[100svh] w-full bg-primary opacity-50"
        onClick={handleMenuToggle}
      />
    );
  };

  return (
    <>
      {renderHamburgerButton()}
      {renderMenu()}
      {isOpen && renderBackdrop()}
    </>
  );
}
