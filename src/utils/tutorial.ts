import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const tutorialToday = driver({
  showProgress: true,
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
