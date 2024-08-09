export const query = `{
	"studio": *[_type == "studio" && slug.current == $slug][0]{
		_id,
		name,
		slug,
		description,
		founded,
		size,
		mainImage{crop,hotspot,asset->},
		studioSoundsPlaylist,
		interview->{
			_id,
			title,
			slug,
			posterImage{crop,hotspot,asset->},
		},
		website,
		instagram,
		category[]->,
		exploreMore{documentTypes,city[]->{_id},country[]->{_id,name},category[]->{_id}},
		location[]->{
			_id, name,slug, country->{name,slug}
		  },
		  "works": *[_type == "project" && references(^._id)]{
			_id,
			slug,
			title,
			posterImage{crop,hotspot,asset->},
		},
	}
  }`
import { Suspense } from "react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import StudioFeaturedWork from "@/components/StudioFeaturedWork";
import StudioInterview from "@/components/StudioInterview";
import { PortableText } from "@portabletext/react";
// import TextCallout from "@/components/TextCallout";
import StudioSounds from "@/components/StudioSounds";
import ExploreMore from "@/components/ExploreMore";
import BookmarkButton from "@/components/BookmarkButton";
import Link from "next/link";
const builder = imageUrlBuilder(client);

export default async function StudioComponent({ data }) {
    const { studio } = data || {}

	// console.log(studio);
	// const playlistData = await getPlaylist(playlistUrl);
	// const { name, images, tracks } = await playlistData.json();

    // const callOutTitleExplore = "Exploration Redefined";
	// const calloutTextExplore = (
	// 	<p>
	// 		At Museum Department, every element is intricately interwoven. Whether a
	// 		studio, foundry, or individual is linked to a project, typeface,
	// 		interview, or artifact, our sophisticated search mechanism ensures
	// 		effortless discovery.
	// 	</p>
	// );

    return (
	<>
			<section className=" px-18 mx-auto my-20">
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
								Bookmark studio
							</h2>
							<ul className=" space-y-2 font-mono text-xs">
							<li><BookmarkButton documentId={studio._id} variant="icon" message={`${studio?.name}`} /></li>

							</ul>
						</div>
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Studio
							</h2>
							<ul className=" space-y-2 font-mono text-xs">
								<li>{studio.name}</li>
							</ul>
						</div>
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Founded
							</h2>
							<ul className=" space-y-2 font-mono text-xs">
								<li>{studio.founded}</li>
							</ul>
						</div>
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Size
							</h2>
							<ul className=" space-y-2 font-mono text-xs">
								<li>{studio.size}</li>
							</ul>
						</div>
						<div className="mb-5">
						<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Location
							</h2>
							<ul className=" space-y-1 font-mono text-xs">
								{studio.location?.map((item, index) => (
									<li key={item._id} className="">
										<Link
											href={`/reference/${item?.slug.current}`}
											className="underline decoration-md-grey-300 underline-offset-[6px] hover:decoration-md-grey-400 transition-colors"
										>
											{item?.name}
										</Link>
										,{" "}
										<Link
											href={`/reference/${item?.country.slug.current}`}
											className="underline decoration-md-grey-300 underline-offset-[6px] hover:decoration-md-grey-400 transition-colors"
										>
											{item?.country.name}
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Categories
							</h2>
							<ul className=" space-y-2 font-mono text-xs">
							{studio.category?.map((cat, index) => (
                  <li key={index}>
					<Link href={`/reference/${cat.slug.current}`} className="underline decoration-md-grey-300 underline-offset-[6px] hover:decoration-md-grey-400 transition-colors">

                      {cat.title}
						
						</Link>
                   

                  </li>
                ))}
							</ul>
						</div>
						
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Visit
							</h2>
							<ul className=" space-y-2 font-mono text-xs">
								<li>
									<a href={studio.website} target="_blank" className="underline decoration-md-grey-300 underline-offset-[6px] hover:decoration-md-grey-400 transition-colors">Website</a>
								</li>
								<li>
									<a href={studio.instagram} target="_blank" className="underline decoration-md-grey-300 underline-offset-[6px] hover:decoration-md-grey-400 transition-colors">Instagram</a>
								</li>
							</ul>
						</div>

					</div>
					<div className="article mb-10 md:mb-0 col-span-6 text-xl font-medium">
						<PortableText value={studio.description} />
					</div>
				</div>
			</section>
			<StudioFeaturedWork name={studio.name} featuredWork={studio.works} />
			{studio.interview && (
			<StudioInterview data={studio} />
			)}
			{studio.studioSoundsPlaylist && (
			<Suspense fallback={<div>Loading...</div>}>
				<StudioSounds playlistUrl={studio.studioSoundsPlaylist} />
			</Suspense>
			)}
			<ExploreMore data={studio.exploreMore} />
		</>
    )
  }
  