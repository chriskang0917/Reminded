import { PopoverDOM, driver } from "driver.js";
import "driver.js/dist/driver.css";

const popoverRender = (popover: PopoverDOM) => {
  popover.wrapper.classList.add(
    "rounded-xl",
    "shadow-xl",
    "bg-white",
    "tracking-wide",
  );
  popover.title.classList.add("text-xl", "font-bold", "text-primary");
  popover.description.classList.add(
    "text-lg",
    "text-thirdDark",
    "tracking-wider",
  );

  popover.previousButton.style.borderRadius = "5px";
  popover.previousButton.style.color = "#32435F";

  popover.nextButton.classList.add("text-lg", "bg-thirdDark", "rounded-2xl");
  popover.nextButton.style.borderRadius = "5px";
};

const driverConfig = {
  showProgress: true,
  allowClose: false,
  overlayOpacity: 0.5,
  stageRadius: 10,
  progressText: "第 {{current}}/{{total}} 步",
  nextBtnText: "下一步",
  prevBtnText: "上一步",
  doneBtnText: "完成",
  onPopoverRender: popoverRender,
};

export const tutorialToday = driver({
  ...driverConfig,
  steps: [
    {
      element: "#tutorial-today-1",
      popover: {
        title: "捕捉你的靈感或待辦",
        description:
          "透過快捷鍵 ⌘ + ⇧ + I 或點擊上方切換鈕，切換輸入靈感或標籤，開始輸入你的每日靈感或待辦。",
      },
    },
    {
      element: "#tutorial-today-2",
      popover: {
        title: "查看靈感或待辦",
        description: "透過切換標籤，查看你輸入的每日靈感或待辦。",
      },
    },
    {
      element: "#tutorial-today-3",
      popover: {
        title: "點擊查看新增靈感",
        description: "新增的靈感會顯示在靈感區域。",
      },
    },
  ],
});
