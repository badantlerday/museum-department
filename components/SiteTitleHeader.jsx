"use client"
import { motion } from "framer-motion";
export default function SiteTitleHeader() {
	return (
        <motion.div
        initial={{ opacity: 0, y: 30 }}
        className=""
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
            duration: 0.75,
            delay: 0,
        }}
        viewport={{ once: true }}
       
    >
        <h1 className="text-center text-md-black text-[80px] font-black mx-auto flex flex-col mt-56 mb-40 tracking-[-1%] leading-[85%]">
          <span>CURATING</span><span>CONTEMPORARY</span><span>CULTURE</span>
        </h1>
      </motion.div>
	);
}
