import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../../../sanity/lib/client";
import Link from "next/link";
import StudioFeaturedWork from "@/components/StudioFeaturedWork";
import StudioInterview from "@/components/StudioInterview";
import { PortableText } from "@portabletext/react";
import TextCallout from "@/components/TextCallout";

const builder = imageUrlBuilder(client);

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({ params, searchParams }, parent) {
	const { slug } = params;
	const query = `*[_type == "studio" && slug.current == $slug][0]{
		name,
	  }`;
	const studio = await client.fetch(query, { slug });

	return {
		title: studio.title,
	};
}

export default async function Studio({ params }) {
	const { slug } = params;
	const query = `*[_type == "studio" && slug.current == $slug][0]{
			_id,
            name,
            slug,
			mainImage{crop,hotspot,asset->},
			description,
			location[]->{
				_id, name, country->{name}
			  }
	  }`;
	const studio = await client.fetch(query, { slug }); // Provide the value for $slug
	// console.log(studio);

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
						<h1 className=" text-7xl tracking-wide uppercase mb-1 z-20 mx-auto font-mono text-white max-w-sm text-center">
							{studio.name}
						</h1>
						<div className="absolute bottom-4 z-20 uppercase text-white text-center w-full font-mono text-md">
							A Design Studio from {studio.location[0].name},{" "}
							{studio.location[0].country.name}
						</div>
						<Image
							className="aspect-video object-cover absolute z-10"
							src={builder.image(studio.mainImage).width(1500).url()}
							width={1500}
							height={900}
							blurDataURL={studio.mainImage.asset.metadata.lqip}
							placeholder="blur"
							alt={studio?.name}
						/>
					</div>
				) : (
					<div className=" aspect-video bg-slate-200"></div>
				)}
			</section>
			{/* 
			<section className="px-20 mx-auto _py-36 text-center justify-center flex flex-col h-[600px] bg-slate-300_">
				<h1 className="text-[28px] tracking-wide uppercase mb-1">
					{studio?.name}
				</h1>
				<p className="font-serif light text-3xl">
					from{" "}
					<span className="underline decoration-slate-300 underline-offset-[6px] hover:decoration-slate-600 transition-colors">
						{studio.location[0].name}
					</span>
					,{" "}
					<span className="underline decoration-slate-300 underline-offset-[6px] hover:decoration-slate-600 transition-colors">
						{studio.location[0].country.name}
					</span>
				</p>
			</section> */}
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
								<li>-</li>
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
			<StudioFeaturedWork name={studio.name} />
			<StudioInterview />
			<TextCallout
				title={callOutTitleExplore}
				text={calloutTextExplore}
				key={callOutTitleExplore}
			/>
		</>
	);
}
