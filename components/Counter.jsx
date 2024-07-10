'use client';
import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Counter({ number = 50,id }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (value) => Math.round(value));

  // Use the useInView hook to get a ref and inView status
  const [ref, inView] = useInView({
    triggerOnce: false, // Ensures the animation only runs once
    threshold: 0.2, // Adjust this value to control how much of the component should be in view before the animation starts
  });

  useEffect(() => {
    if (inView) {
      const animation = animate(count, number, { duration: 1, ease: "easeInOut" });
      return () => animation.stop();
    } else {
      count.set(0); // Reset count when the element leaves view
    }
  }, [inView, count, number]);

  return (
    <motion.span
      ref={ref}
      key={id}
      className="text-center inline-block w-[50px] bg-md-grey-100 rounded-sm mx-[2px]"
    >
      {rounded}
    </motion.span>
  );
}