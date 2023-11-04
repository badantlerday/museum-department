'use client'
import Image from "next/image";
import { motion } from "framer-motion";
export default function FeedPost({
	id,
	title,
	byline,
	href,
	image,
	padding,
	layout,
	animationDelay
}) {
	let postContent;

	switch (layout) {
		case "image":
			postContent = (
				<div className={`${padding} mb-40`}>
					{image && <Image src={image} alt="" width={1000} height={1000} />}
					<div className="text-sm mt-2">
						<h2 className="font-medium uppercase tracking-wide">{title} (2)</h2>
						<div className="font-medium italic">{byline}</div>
					</div>
				</div>
			);
			break;

		case "image-text":
			postContent = (
				// Define the structure for the "image-text" layout

				<div className={`${padding} mb-40`}>
					<div className="font-medium uppercase text-2xl text-center tracking-wide mb-6">
						<h2>
							{title}
							<span className=" italic block">{byline}</span>
						</h2>
					</div>
					{image && <Image src={image} alt="" width={1000} height={1000} />}
					
				</div>
			);
			break;

		case "text":
			postContent = (
				// Define the structure for the "text" layout
				<div className={`${padding} mb-40`}>
					<div className=" bg-[#F0EDEA] rounded-lg py-6 text-center">
						<div className=" font-medium tracking-wide uppercase text-sm relative">
							{title}
							<span className="text-[9px] mt-[-5px] absolute ml-1">( 1 )</span>
						</div>
						<div className=" font-serif font-thin">{byline}</div>
					</div>
				</div>
			);
			break;

		case "image-font":
			postContent = (
				// Define the structure for the "image-font" layout
				<div className={`${padding} mb-40`}>
					{image && <Image src={image} alt="" width={1000} height={1000} />}
					<div className="text-sm mt-2">
						<h2 className="font-medium uppercase tracking-wide">{title}</h2>
						<div className="italic">{byline}</div>
					</div>
				</div>
			);
			break;

		default:
			postContent = null; // Handle unknown layouts or provide a default
	}

	return <motion.div
	initial={{ opacity: 0, y: 30 }}
	whileInView={{ opacity: 1, y: 0 }}
	transition={{
		duration: 0.75,
		delay: animationDelay,
		// bounce: 0.4,
		// type: "spring",
	}}
	viewport={{ once: true }}
	key={id}
>{postContent}</motion.div>;
}
