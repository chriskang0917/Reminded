import { motion } from "framer-motion";
import { forwardRef } from "react";

const MotionItem = forwardRef(
  (
    { children }: { children: React.ReactNode },
    ref: React.Ref<HTMLLIElement>,
  ) => {
    return (
      <motion.li
        ref={ref}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.2 }}
      >
        {children}
      </motion.li>
    );
  },
);

export default MotionItem;
