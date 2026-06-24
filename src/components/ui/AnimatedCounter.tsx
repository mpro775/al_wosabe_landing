"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import "slot-text/style.css";
import { SlotText } from "slot-text/react";

export function AnimatedCounter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (!inView || reducedMotion) {
      return;
    }

    let frame = 0;
    const frames = 42;
    const timer = window.setInterval(() => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / frames, 3);
      setDisplay(Math.round(value * progress));
      if (frame >= frames) {
        window.clearInterval(timer);
        setDisplay(value);
      }
    }, 20);

    return () => window.clearInterval(timer);
  }, [inView, reducedMotion, value]);

  return (
    <span
      ref={ref}
      className={className}
      dir="ltr"
      style={{ display: "inline-flex", direction: "ltr", unicodeBidi: "isolate" }}
    >
      <SlotText
        text={String(display)}
        options={{
          direction: "up",
          stagger: 30,
          duration: 280,
          bounce: 0.4,
          skipUnchanged: true,
        }}
        style={{ fontVariantNumeric: "tabular-nums" }}
      />
      {suffix}
    </span>
  );
}
