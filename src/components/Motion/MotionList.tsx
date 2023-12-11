import { AnimatePresence } from "framer-motion";

interface MotionListProps {
  children: React.ReactNode;
}

function MotionList({ children }: MotionListProps) {
  return <AnimatePresence mode="popLayout">{children}</AnimatePresence>;
}

export default MotionList;
