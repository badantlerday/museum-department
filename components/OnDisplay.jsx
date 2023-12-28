import FeedPost from "./FeedPost";
import { client } from "../sanity/lib/client";
import SectionHeader from "./SectionHeader";
export default async function OnDisplay() {

	const query = `*[_type == "project" && ondisplay == true]{
		_id,
		title,
		slug,
		posterImage{crop,hotspot,asset->},
		displaySettings
	  }`;
	  const ondisplay = await client.fetch(query);
	//   console.log(ondisplay);

	const posts = [
		{
			id: 1,
			title: "Haw-Lin Services",
			byline: "Lululemon",
			href: "#",
			image: "/image1.jpg",
			padding: "lg:mx-16",
			layout: "image",
		},
		{
			id: 2,
			title: "In Conversations with",
			byline: "Veronica Ditting",
			href: "#",
			image: "/image2.jpg",
			padding: "lg:mx-16",
			layout: "image",
		},
		{
			id: 3,
			title: "Cupidatat aliquip adipisicing",
			byline: "Veniam id elit deserunt irure amet aliquip deserunt incididunt",
			href: "#",
			image: "/image2.jpg",
			padding: "lg:mx-16",
			layout: "image",
		},
		{
			id: 4,
			title: "Sourcetype",
			byline: "Reform",
			href: "#",
			image: "/image4.jpg",
			padding: "",
			layout: "image-font",
		},
		{
			id: 5,
			title: "Brunswicker Studio",
			byline: "Frama Identety",
			href: "#",
			image: "/image3.jpg",
			padding: "",
			layout: "image",
		},
		{
			id: 6,
			title: "Comission",
			byline: "A Graphic Design Studio",
			href: "#",
			image: "/image2.jpg",
			padding: "lg:mx-16",
			layout: "image",
		},
		{
			id: 7,
			title: "Lauren Bamford",
			byline: "Gossamer Studio",
			href: "#",
			image: "/image5.jpg",
			padding: "lg:mx-16",
			layout: "image",
		},
		{
			id: 8,
			title: "Perron-Reottinger",
			byline: "Ghia",
			href: "#",
			image: "/image6.jpg",
			padding: "lg:mx-16",
			layout: "image",
		},
		{
			id: 9,
			title: "Font in Use",
			byline: "Another by Alias",
			href: "#",
			image: "/image2.jpg",
			padding: "",
			layout: "image",
		},
		{
			id: 10,
			title: "Sharp",
			byline: "Beaujon",
			href: "#",
			image: "/image8.jpg",
			padding: "",
			layout: "image",
		},
	];
	return (
		<>
			<div className="px-20">
				<SectionHeader title="On Display" />
			</div>
			<div className="px-20 flex gap-12 lg:gap-24 w-full ">
				<div className="w-full">
					{ondisplay.map((post, index) => {
						if (index % 2 === 0) {
							return (
								<div
									
									key={post._id}
								>
									{/* <FeedPost
										id={post.id}
										title={post.title}
										byline={post.byline}
										href={post.href}
										image={post.image}
										padding={post.padding}
										layout={post.layout}
										animationDelay={0}
									/> */}
									<FeedPost
										id={post._id}
										title={post.title}
										byline={post.displaySettings?.ondisplayByline}
										href={post.slug}
										image={post.posterImage}
										// padding={post.padding}
										// layout={post.layout}
										animationDelay={0}
									/>
								</div>
							);
						}
						return null; // Odd posts go to the next column
					})}
				</div>
				<div className="w-full pt-48">
					{ondisplay.map((post, index) => {
						if (index % 2 !== 0) {
							return (
								<div
									
									key={post._id}
								>
									<FeedPost
										id={post._id}
										title={post.title}
										byline={post.displaySettings?.ondisplayByline}
										href={post.slug}
										image={post.posterImage}
										// padding={post.padding}
										// layout={post.layout}
										animationDelay={0}
									/>
									{/* <FeedPost
										id={post.id}
										title={post.title}
										byline={post.byline}
										href={post.href}
										image={post.image}
										padding={post.padding}
										layout={post.layout}
										animationDelay={0.35}
									/> */}
								</div>
							);
						}
						return null; // Even posts go to the previous column
					})}
				</div>
			</div>
		</>
	);
}
