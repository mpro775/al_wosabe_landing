"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const offset = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: {
  children: ReactNode;
  delay?: number;
  direction?: keyof typeof offset;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const initial = reducedMotion ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset[direction] };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
