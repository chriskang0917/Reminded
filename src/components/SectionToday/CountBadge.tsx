import { motion } from "framer-motion";

function CountBadge({ num }: { num: number }) {
  return (
    <motion.div
      className="flex h-6 w-6 items-center justify-center rounded-full bg-fourth p-1 text-xs text-primary"
      key={num}
      animate={{ scale: [1, 1.5, 1] }}
      transition={{ duration: 0.3 }}
    >
      <span>{num}</span>
    </motion.div>
  );
}

export default CountBadge;
