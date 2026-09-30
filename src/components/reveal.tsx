"use client";

import { motion, useReducedMotion } from "motion/react";

export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ y: 16 }}
      animate={{ y: 0 }}
      transition={{ duration: reduced ? 0 : 0.55 }}
    >
      <div className="reveal-inner">{children}</div>
    </motion.div>
  );
}
