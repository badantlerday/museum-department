"use client";
import { useState, useRef, useEffect } from "react";
import { InView } from "react-intersection-observer";

const VideoCloudinary = ({
	data,
	blockref,
	transformation = "video_thumbnail",
	autoPlay = false,
	mobile = false,
	hasMobile = false,
}) => {
	const [playVideo, setPlayVideo] = useState(false);
	const videoRef = useRef(null);

	useEffect(() => {
		if (videoRef.current) {
			if (playVideo) {
				videoRef.current.play();
			} else {
				videoRef.current.pause();
			}
		}
	}, [playVideo]);

	return (
		<InView
			as="div"
			onChange={(inView, entry) => setPlayVideo(inView)}
			className={`_h-full _w-full ${hasMobile ? "hidden sm:block" : "block"}`}
			rootMargin="100px 0px 100px 0px"
			threshold={0.0} // Adjust this value to set how much of the video needs to be visible to start playing
		>
			<video
				ref={videoRef}
				// {...(autoPlay ? { autoPlay: true } : {})}
				loop
				playsInline
				muted
				className="_h-full _w-full animate-in fade-in duration-1000 object-cover"
				key={blockref}
			>
				<source
					src={`https://res.cloudinary.com/museumdepartment/video/upload/t_${transformation}/${data.public_id}.${data.format}`}
					type="video/mp4"
				/>
			</video>
		</InView>
	);
};

export default VideoCloudinary;

// "use client";
// import { useState } from "react";
// import { InView } from "react-intersection-observer";

// const VideoCloudinary = ({
// 	data,
// 	transformation = "video_thumbnail",
// 	autoPlay = false,
// 	mobile = false,
// 	hasMobile = false,
// }) => {
// 	let [playVideo, setPlayVideo] = useState(false);

// 	// console.log(hasMobile);

// 	return (
// 		<InView
// 			as="div"
// 			onChange={(inView, entry) => setPlayVideo(inView)}
// 			className={`h-full w-full ${hasMobile ? "hidden sm:block" : "block"}`}
// 			rootMargin="100px 0px 100px 0px"
// 		>
// 			{playVideo && (
// 				<video
// 					{...(autoPlay ? { autoPlay: true } : {})}
// 					loop
// 					playsInline
// 					muted
// 					className="h-full w-full animate-fadeIn object-cover"
// 					key={data.public_id}
// 				>
// 					<source
// 						src={`https://res.cloudinary.com/museumdepartment/video/upload/t_${transformation}/${data.public_id}.${data.format}`}
// 						type="video/mp4"
// 					/>
// 				</video>
// 			)}
// 		</InView>
// 	);
// };
// export default VideoCloudinary;
