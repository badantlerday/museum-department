import { client } from "@/lib/sanity.client";
import FeedPost from "@/components/FeedPost";
import SectionHeader from "@/components/SectionHeader";


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

	
	return (
		<section className="py-20">
			{/* <div className="px-20">
				<SectionHeader title="On Display" />
			</div> */}
			<div className="px-8 md:px-20 flex gap-12 lg:gap-24 w-full ">
				<div className="w-full">
					{ondisplay.map((post, index) => {
						if (index % 2 === 0) {
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
										layout={post.displaySettings?.ondisplayAlignment}
										animationDelay={0}
									/>
								</div>
							);
						}
						return null; // Odd posts go to the next column
					})}
				</div>
				<div className="w-full pt-40">
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
										layout={post.displaySettings?.ondisplayAlignment}
										animationDelay={0}
									/>									
								</div>
							);
						}
						return null; // Even posts go to the previous column
					})}
				</div>
			</div>
		</section>
	);
}
