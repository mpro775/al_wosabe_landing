"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function ParallaxImage({
  src,
  alt,
  fill = true,
  className = "",
  containerClassName = "",
  sizes,
  priority = false,
  aspectRatio = "aspect-[4/3]",
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  containerClassName?: string;
  sizes?: string;
  priority?: boolean;
  aspectRatio?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to translateY and scale transformations
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.0, 1.06]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full ${aspectRatio} ${containerClassName}`}
    >
      <motion.div
        className="absolute -inset-y-[15%] inset-x-0 w-full h-[130%]"
        style={shouldReduceMotion ? {} : { y, scale }}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          sizes={sizes}
          priority={priority}
          className={`object-cover ${className}`}
        />
      </motion.div>
    </div>
  );
}
