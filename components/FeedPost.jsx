"use client";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import { motion } from "framer-motion";
import Link from "next/link";
const builder = imageUrlBuilder(client);
export default function FeedPost({
	id,
	title,
	byline = "Byline",
	href,
	image = "/image1.jpg",
	padding = "",
	layout = "center",
	animationDelay
}) {
	// console.log(image);
	let postContent;

	switch (layout) {
		case "left":
			postContent = (
				<div className={`${padding} mb-40 col-span-10 col-start-1`}>
				<Link
				
				href={`/project/${href.current}`}
				passHref
			>
					{image && <Image src={builder.image(image).width(500).url()} alt="" width={1000} height={1000} />}
					<div className="text-sm mt-2">
						<h2 className="font-medium uppercase tracking-wide">{title}</h2>
						<div className="font-medium italic">{byline}</div>
					</div>
				</Link>
				</div>
			);
			break;
		case "center":
			postContent = (
				<div className={`${padding} mb-40 col-span-10 col-start-2`}>
				<Link
				
				href={`/project/${href.current}`}
				passHref
			>
					{image && <Image src={builder.image(image).width(500).url()} alt="" width={1000} height={1000} />}
					<div className="text-sm mt-2">
						<h2 className="font-medium uppercase tracking-wide">{title}</h2>
						<div className="font-medium italic">{byline}</div>
					</div>
				</Link>
				</div>
			);
			break;

			case "right":
				postContent = (
					<div className={`${padding} mb-40 col-span-10 col-start-3`}>
					<Link
					
					href={`/project/${href.current}`}
					passHref
				>
						{image && <Image src={builder.image(image).width(500).url()} alt="" width={1000} height={1000} />}
						<div className="text-sm mt-2">
							<h2 className="font-medium uppercase tracking-wide">{title}</h2>
							<div className="font-medium italic">{byline}</div>
						</div>
					</Link>
					</div>
				);
				break;

				case "full":
					postContent = (
						<div className={`${padding} mb-40 col-span-12`}>
						<Link
						
						href={`/project/${href.current}`}
						passHref
					>
							{image && <Image src={builder.image(image).width(500).url()} alt="" width={1000} height={1000} />}
							<div className="text-sm mt-2">
								<h2 className="font-medium uppercase tracking-wide">{title}</h2>
								<div className="font-medium italic">{byline}</div>
							</div>
						</Link>
						</div>
					);
					break;

		default:
			postContent = null; // Handle unknown layouts or provide a default
	}

	return <motion.div
	initial={{ opacity: 0, y: 30 }}
	className="grid grid-cols-12"
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
