"use client";
import React, { useState, useEffect } from "react";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
const builder = imageUrlBuilder(client);

const StudioImageSlideshow = ({ images, alt }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isHovering, setIsHovering] = useState(false);

	useEffect(() => {
		let interval;
		if (isHovering && images.length > 1) {
			interval = setInterval(() => {
				setCurrentImageIndex((prevIndex) =>
					prevIndex === images.length - 1 ? 0 : prevIndex + 1
				);
			}, 500); // Change image every 1 second
		}

		return () => clearInterval(interval);
	}, [isHovering, images.length]);

	return (
		<div
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<Image
				className="aspect-[3/4] mb-2 object-cover"
				src={builder.image(images[currentImageIndex]).width(1000).url()}
				width={800}
				height={665}
				blurDataURL={images[currentImageIndex].asset.metadata.lqip}
				placeholder="blur"
				alt={alt}
			/>
		</div>
	);
};

export default StudioImageSlideshow;
