import { Accordion, AccordionItem, cn } from "@nextui-org/react";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline, IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const renderMenuButton = () => {
    return (
      <div
        className={cn(
          "fixed left-5 top-5 z-[9999]",
          "block md:hidden",
          "h-10 w-10 rounded-full drop-shadow-md",
          "flex items-center justify-center",
          isOpen ? "bg-white text-secondary" : "bg-fourth text-primary",
          "hover:bg-white hover:text-secondary",
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
    const titles = [
      {
        title: "今日",
        subtitles: [{ subtitle: "今日靈感 / 待辦", path: "/" }],
        icon: <IoHomeOutline />,
      },
      {
        title: "待辦",
        subtitles: [{ subtitle: "今日待辦", path: "/todo/today" }],
      },
      // "行動",
      // "靈感",
      // "筆記",
    ];

    return (
      <div
        className={cn(
          "fixed z-20 h-[100svh] w-[90svw] pl-12 pr-5 pt-20",
          "rounded-[40px] bg-fourth drop-shadow-md",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-[-10%]" : "translate-x-[-100%]",
        )}
      >
        <Accordion
          selectionMode="multiple"
          variant="shadow"
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
              <ul className="mb-2 font-normal">
                {subtitles?.map(({ subtitle, path }) => {
                  return (
                    <li className="flex items-center gap-2" key={subtitle}>
                      <Link to={path} className="w-full">
                        <h2>{subtitle}</h2>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  };

  return (
    <>
      {renderMenu()}
      {renderMenuButton()}
    </>
  );
}
