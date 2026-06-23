"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Tag, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/locales";

type ShowcaseProduct = {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  category: string;
};

/**
 * Owns the auto-cycling state for the hero showcase. Lifted into the Hero so the
 * kinetic headline word and the stage share one active index. Auto-advance pauses
 * on hover/focus and is disabled entirely under prefers-reduced-motion.
 */
export function useShowcaseCycle(length: number, intervalMs = 3800) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    if (paused || reduce || length <= 1) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % length), intervalMs);
    return () => window.clearInterval(id);
    // `active` is included so a manual tab selection restarts the full interval.
  }, [paused, reduce, length, intervalMs, active]);

  return { active, setActive, setPaused, reduce };
}

export function ProductShowcase({
  products,
  locale,
  active,
  onSelect,
  onPauseChange,
  intervalMs = 3800,
}: {
  products: ShowcaseProduct[];
  locale: Locale;
  active: number;
  onSelect: (index: number) => void;
  onPauseChange: (paused: boolean) => void;
  intervalMs?: number;
}) {
  const isAr = locale === "ar";
  const reduce = useReducedMotion() ?? false;
  const current = products[active];
  const Icon = current.icon;

  const stageRef = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [9, -9]), { stiffness: 140, damping: 16 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-11, 11]), { stiffness: 140, damping: 16 });

  const handlePointer = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetPointer = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[480px]"
      onMouseEnter={() => onPauseChange(true)}
      onMouseLeave={() => {
        onPauseChange(false);
        resetPointer();
      }}
      onFocusCapture={() => onPauseChange(true)}
      onBlurCapture={() => onPauseChange(false)}
    >
      <span className="sr-only" aria-live="polite">
        {current.title}
      </span>

      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-7">
        {/* Stage */}
        <div
          ref={stageRef}
          onPointerMove={handlePointer}
          className="relative grid aspect-square w-full max-w-[340px] flex-1 place-items-center sm:max-w-[380px]"
          style={{ perspective: 1100 }}
        >
          {/* Rotating brushed-chrome ring + tick marks (echoes the logo ring) */}
          <motion.div
            aria-hidden="true"
            className="product-ring absolute inset-[4%]"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={reduce ? undefined : { duration: 26, ease: "linear", repeat: Infinity }}
          />
          <motion.div
            aria-hidden="true"
            className="product-ticks absolute inset-[11%]"
            animate={reduce ? undefined : { rotate: -360 }}
            transition={reduce ? undefined : { duration: 40, ease: "linear", repeat: Infinity }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-[16%] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(248,162,30,0.16), transparent 70%)" }}
          />

          {/* Tilting product disc */}
          <motion.div
            className="relative z-10 aspect-square w-[62%]"
            style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={
                  reduce
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.82, rotate: -8, filter: "blur(8px)" }
                }
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                exit={
                  reduce
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 1.08, rotate: 7, filter: "blur(8px)" }
                }
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="h-full w-full rounded-full p-[3px]"
                  style={{ background: "var(--grad-chrome)", boxShadow: "var(--shadow-elev-3)" }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-full bg-ink-900">
                    <Image
                      src={current.image}
                      alt={current.title}
                      fill
                      sizes="(max-width: 1024px) 60vw, 320px"
                      priority={active === 0}
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/65 via-transparent to-transparent" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Floating spec chips — re-animate per active product */}
          <Chip key={`title-${active}`} className="end-[2%] top-[6%]" reduce={reduce}>
            <Icon size={14} aria-hidden="true" className="text-brand-bright" />
            {current.title}
          </Chip>
          <Chip key={`reach-${active}`} className="bottom-[12%] start-0" reduce={reduce} delay={0.12}>
            <Truck size={14} aria-hidden="true" className="text-brand-bright" />
            {isAr ? "توزيع وطني" : "Nationwide"}
          </Chip>
          <Chip key={`cat-${active}`} className="bottom-[2%] end-[20%]" reduce={reduce} delay={0.22}>
            <Tag size={14} aria-hidden="true" className="text-brand-bright" />
            {current.category}
          </Chip>
        </div>

        {/* Category tabs */}
        <div
          role="tablist"
          aria-label={isAr ? "فئات المنتجات" : "Product categories"}
          aria-orientation="vertical"
          className="flex w-full gap-2 overflow-x-auto pb-1 lg:w-44 lg:flex-col lg:overflow-visible lg:pb-0"
        >
          {products.map((product, index) => {
            const selected = index === active;
            const ProductIcon = product.icon;
            return (
              <button
                key={product.title}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => onSelect(index)}
                className={cn(
                  "focus-ring group relative shrink-0 overflow-hidden rounded-xl border px-3 py-2.5 text-start transition-all duration-300",
                  selected
                    ? "border-brand/40 bg-white/[0.06]"
                    : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]",
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300",
                      selected ? "chrome text-ink-950" : "bg-white/5 text-steel-400 group-hover:text-steel-200",
                    )}
                  >
                    <ProductIcon size={16} aria-hidden="true" />
                  </span>
                  <span
                    className={cn(
                      "text-xs font-bold tracking-tight whitespace-nowrap transition-colors duration-300 lg:whitespace-normal",
                      selected ? "text-white" : "text-steel-400 group-hover:text-steel-200",
                    )}
                  >
                    {product.title}
                  </span>
                </span>

                {selected && (
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
                    <motion.span
                      key={active}
                      className="block h-full bg-[image:var(--grad-brand)]"
                      style={{ transformOrigin: isAr ? "right" : "left" }}
                      initial={{ scaleX: reduce ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: reduce ? 0 : intervalMs / 1000, ease: "linear" }}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Chip({
  children,
  className,
  reduce,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  reduce: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn("absolute z-20", className)}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={reduce ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-ink-900/85 px-3 py-2 text-[11px] font-bold text-steel-200 shadow-[var(--shadow-elev-2)] backdrop-blur-md"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
