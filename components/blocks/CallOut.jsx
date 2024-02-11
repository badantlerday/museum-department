"use client";
import { motion } from "framer-motion";
import React from "react";

// {
// 	title = "Exploration Redefined",
// 	text = <p>At Museum Department, every element is intricately interwoven.</p>,
// 	button = false,
// 	buttonText = "Learn More",
// 	buttonLink = "/",
// }


export default function CallOut({ data = {} }) {
const {
	title = "Exploration Redefined",
	text = <p>At Museum Department, every element is intricately interwoven.</p>,
	button = false,
	buttonText = "Learn More",
	buttonLink = "/",
}  = data || {}


	return (
		<motion.div
		initial={{ opacity: 0, y: 30 }}
		whileInView={{ opacity: 1, y: 0 }}
		transition={{
			duration: 0.75,
			delay: 0,
			// bounce: 0.4,
			// type: "spring",
		}}
		viewport={{ once: true }}
		key="manifest"
		className="py-20"
	>
		<div className="px-4 lg:px-0 article font-medium text-xl lg:text-2xl max-w-2xl mx-auto tracking-[0.5%]">
			<div>
				<span className="uppercase">{title} — </span>
				{text}
			</div>
			{buttonLink && (
				<a
					href={buttonLink}
					className="mt-4 inline-block border border-black p-3 text-xs uppercase tracking-wide hover:bg-black hover:text-white transition-all"
				>
					{buttonText}
				</a>
			)}
		</div>
		</motion.div>
	);
}
