import { Config, driver, Driver, DriveStep, PopoverDOM } from "driver.js";
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
  popover.nextButton.style.borderRadius = "5px";
  popover.nextButton.style.color = "#32435F";
};

export const driverConfig = {
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

export let tutorial: Driver;

export const initTutorial = (steps: DriveStep[], configs?: Partial<Config>) => {
  tutorial = driver({ ...driverConfig, steps, ...configs });
  tutorial.drive();
};

export const todaySteps: DriveStep[] = [
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
      side: "bottom",
    },
  },
  {
    element: "#tutorial-today-3",
    popover: {
      title: "點選查看新增靈感",
      description: "新增的靈感會顯示在靈感區域。",
    },
  },
];

export const ideaSteps: DriveStep[] = [
  {
    element: "#tutorial-ideas-1",
    popover: {
      title: "查看本週靈感",
      description: "預設存放「週日至週六」的靈感，快速查看已經儲存的靈感。",
    },
  },
  {
    element: "#tutorial-ideas-2",
    popover: {
      showButtons: ["previous"],
      title: "點選轉換行動鈕",
      description: "將靈感轉換為可執行的行動，用以未來執行你的靈感。",
    },
  },
  {
    element: "#tutorial-ideas-3",
    popover: {
      title: "查看行動",
      description: "將靈感轉換為行動後，會顯示在行動區域。",
    },
  },
  {
    element: "#tutorial-ideas-4",
    popover: {
      showButtons: ["previous"],
      title: "點選轉換筆記按鈕",
      description: "將靈感轉換為更完整的筆記，用以未來快速查閱或新增知識。",
    },
  },
  {
    element: "#tutorial-ideas-5",
    popover: {
      title: "查看筆記",
      description:
        "可在筆記區域查看已經儲存的筆記，也能透過搜尋快速找到相關筆記。",
    },
  },
  {
    element: "#tutorial-ideas-6",
    popover: {
      title: "查看已轉換靈感",
      description:
        "這裡可以查看已經轉換為行動或筆記的靈感，用以回顧或再次轉換靈感。",
    },
  },
];

export const actionSteps: DriveStep[] = [
  {
    element: "#tutorial-actions-1",
    popover: {
      showButtons: [],
      title: "設定行動執行日",
      description: "將行動設定為某一天執行，將規劃的行動化為待辦。",
    },
  },
  {
    element: "#tutorial-actions-2",
    popover: {
      title: "查看過期行動",
      description: "若為行動設定日期但沒有執行，會顯示在這裡，提醒你執行行動。",
    },
  },
  {
    element: "#tutorial-actions-3",
    popover: {
      title: "查看已執行行動",
      description:
        "這裡可以查看已經被執行過的行動，用以回顧或再次規劃行動，也給自己一些鼓勵！",
    },
  },
];

export const todoSteps: DriveStep[] = [
  {
    element: "#tutorial-todo-1",
    popover: {
      title: "拖曳待辦事項",
      description:
        "這裡可以查看目前已有的行動，能夠透過拖曳從行動放進明日待辦。",
    },
  },
  {
    element: "#tutorial-todo-2",
    popover: {
      title: "將待辦轉換為行動",
      description: "這裡可以查看明日的待辦，也可以將待辦轉換為行動未來再做。",
    },
  },
  {
    element: "#tutorial-todo-3",
    popover: {
      title: "查看週六前的待辦",
      description: "這裡可以查看一個工作週循環內的待辦，預設為週日至週六。",
    },
  },
];
