'use client'
import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function Counter({ number = 50 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, number, { duration: 2 });

    return () => animation.stop();
  }, [count, number]);

  return (
    <motion.span className="w-5 text-center inline-block">{rounded}</motion.span>
  );
}
