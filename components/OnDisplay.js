import { motion, Variants } from "framer-motion";
import FeedPost from "./FeedPost";
export default function OnDisplay() {
	const variants = {
		offscreen: {
			y: 300,
		},
		onscreen: {
			y: 50,
			rotate: -10,
			transition: {
				type: "spring",
				bounce: 0.4,
				duration: 0.8,
			},
		},
	};

	const posts = [
		{
			id: 1,
			title: "Haw-Lin Services",
			byline: "Lululemon",
			href: "#",
			image: "image1.jpg",
			padding: "lg:mx-16",
			layout: "image",
		},
		{
			id: 2,
			title: "In Conversations with",
			byline: "Veronica Ditting",
			href: "#",
			image: "image2.jpg",
			padding: "lg:mx-16",
			layout: "image-text",
		},
		{
			id: 3,
			title: "Cupidatat aliquip adipisicing",
			byline: "Veniam id elit deserunt irure amet aliquip deserunt incididunt",
			href: "#",
			image: "image2.jpg",
			padding: "lg:mx-16",
			layout: "image-text",
		},
		{
			id: 4,
			title: "Sourcetype",
			byline: "Reform",
			href: "#",
			image: "image4.jpg",
			padding: "",
			layout: "image-font",
		},
		{
			id: 5,
			title: "Brunswicker Studio",
			byline: "Frama Identety",
			href: "#",
			image: "image3.jpg",
			padding: "",
			layout: "image",
		},
		{
			id: 6,
			title: "Comission",
			byline: "A Graphic Design Studio",
			href: "#",
			image: "image2.jpg",
			padding: "lg:mx-16",
			layout: "image-text",
		},
		{
			id: 7,
			title: "Lauren Bamford",
			byline: "Gossamer Studio",
			href: "#",
			image: "image5.jpg",
			padding: "lg:mx-16",
			layout: "image",
		},
		{
			id: 8,
			title: "Perron-Reottinger",
			byline: "Ghia",
			href: "#",
			image: "image6.jpg",
			padding: "lg:mx-16",
			layout: "image",
		},
		{
			id: 9,
			title: "Font in Use",
			byline: "Another by Alias",
			href: "#",
			image: "image7.jpg",
			padding: "",
			layout: "image",
		},
		{
			id: 10,
			title: "Sharp",
			byline: "Beaujon",
			href: "#",
			image: "image8.jpg",
			padding: "",
			layout: "image",
		},
	];
	return (
		<>
			<div className="px-20">
				<h2 className=" text-2xl font-medium mb-10">On Display</h2>
			</div>
			<div className="px-20 flex gap-12 lg:gap-24 w-full ">
				<div className="w-full">
					{posts.map((post, index) => {
						if (index % 2 === 0) {
							return (
								<motion.div
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.75,
										delay: 0,
										bounce: 0.4,
										// type: "spring",
									}}
									viewport={{ once: true }}
									key={post.id}
								>
									<FeedPost
										id={post.id}
										title={post.title}
										byline={post.byline}
										href={post.href}
										image={post.image}
										padding={post.padding}
										layout={post.layout}
									/>
								</motion.div>
							);
						}
						return null; // Odd posts go to the next column
					})}
				</div>
				<div className="w-full pt-48">
					{posts.map((post, index) => {
						if (index % 2 !== 0) {
							return (
								<motion.div
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.75, delay: 0.4 }}
									viewport={{ once: true }}
									key={post.id}
								>
									<FeedPost
										id={post.id}
										title={post.title}
										byline={post.byline}
										href={post.href}
										image={post.image}
										padding={post.padding}
										layout={post.layout}
									/>
								</motion.div>
							);
						}
						return null; // Even posts go to the previous column
					})}
				</div>
			</div>
		</>
	);
}
