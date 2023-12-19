import { useEffect } from "react";
import { uiStore } from "../store/uiStore";

export const useStopShortcut = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) uiStore.setInputEditing();
    if (!isOpen) uiStore.stopInputEditing();
  }, [isOpen]);
};
