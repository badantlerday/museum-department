export const query = `{
	"studio": *[_type == "studio" && slug.current == $slug][0]{
		_id,
		name,
		slug,
		description,
		mainImage{crop,hotspot,asset->},
		location[]->{
			_id, name, country->{name}
		  },
		  "works": *[_type == "project" && references(^._id)]{
			_id,
			slug,
			title,
			posterImage{crop,hotspot,asset->},
		},
	}
  }`

import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import StudioFeaturedWork from "@/components/StudioFeaturedWork";
import StudioInterview from "@/components/StudioInterview";
import { PortableText } from "@portabletext/react";
import TextCallout from "@/components/TextCallout";
import StudioSounds from "@/components/StudioSounds";
import ExploreMore from "@/components/ExploreMore";
import BookmarkButton from "@/components/BookmarkButton";
const builder = imageUrlBuilder(client);

  export default function StudioComponent({ data }) {
    const { studio } = data || {}

    const callOutTitleExplore = "Exploration Redefined";
	const calloutTextExplore = (
		<p>
			At Museum Department, every element is intricately interwoven. Whether a
			studio, foundry, or individual is linked to a project, typeface,
			interview, or artifact, our sophisticated search mechanism ensures
			effortless discovery.
		</p>
	);

    return (
<>
			<section className="px-20 mx-auto my-20">
				{studio?.mainImage ? (
					<div className="aspect-video relative flex items-center">
						<h1 className=" text-7xl tracking-wide uppercase mb-1 z-20 mx-auto font-mono text-white max-w-xl text-center">
							{studio.name}
						</h1>
						<div className="absolute bottom-4 z-20 uppercase text-white text-center w-full font-mono text-md">
							A Design Studio from {studio.location[0].name},{" "}
							{studio.location[0].country.name}
						</div>
						<div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-[0.15] z-10"></div>
						<Image
							className="aspect-video object-cover absolute z-0"
							src={builder.image(studio.mainImage).width(2400).url()}
							width={3000}
							height={900}
							blurDataURL={studio.mainImage.asset.metadata.lqip}
							placeholder="blur"
							alt={studio?.name}
						/>
					</div>
				) : (
					<div className="aspect-video relative flex items-center bg-[#FAFBF7]">
						<h1 className=" text-7xl tracking-wide uppercase mb-1 z-20 mx-auto font-mono max-w-xl text-center">
							{studio.name}
						</h1>
						<div className="absolute bottom-4 z-20 uppercase  text-center w-full font-mono text-md">
							A Design Studio from {studio.location[0].name},{" "}
							{studio.location[0].country.name}
						</div>
					</div>
				)}
			</section>
			<section className="pb-36">
				<div className="px-6 md:px-20 grid grid-cols-12 gap-10 w-full">
					<div className="col-span-3">
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Studio
							</h2>
							<ul className=" space-y-2 font-mono text-sm">
								<li>-</li>
							</ul>
						</div>
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Founded
							</h2>
							<ul className=" space-y-2 font-mono text-sm">
								<li>-</li>
							</ul>
						</div>
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Size
							</h2>
						</div>

						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Categories
							</h2>
							<ul className=" space-y-2 font-mono text-sm">
								<li>-</li>
							</ul>
						</div>
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Visit
							</h2>
							<ul className=" space-y-2 font-mono text-sm">
								<li>-</li>
							</ul>
						</div>
						<div className="mb-5">
						<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Bookmark
							</h2>
							<ul className=" space-y-2 font-mono text-sm">
								<li>
									
									<BookmarkButton documentId={studio._id} />
								</li>
							</ul>
						</div>
					</div>
					<div className="article mb-10 md:mb-0 col-span-6 text-xl font-medium">
						<PortableText value={studio.description} />
					</div>
					<div className="article mb-10 md:mb-0 col-start-10 col-span-3">
						<div>
							<div className="text-xs font-mono block text-left mt-2"></div>
						</div>
					</div>
				</div>
			</section>
			<StudioFeaturedWork name={studio.name} featuredWork={studio.works} />
			<StudioInterview />
			<StudioSounds />
			<ExploreMore />
			<TextCallout
				title={callOutTitleExplore}
				text={calloutTextExplore}
				key={callOutTitleExplore}
			/>
		</>
    )
  }
  