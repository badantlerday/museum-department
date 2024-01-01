import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../../../sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import TypefaceBy from "@/components/TypefaceBy";
import FontsInUseBy from "@/components/FontsInUseBy";
const builder = imageUrlBuilder(client);

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
// export async function generateMetadata({ params, searchParams }, parent) {
// 	const { slug } = params;
// 	const query = `*[_type == "foundry" && slug.current == $slug][0]{
// 		name,
// 	  }`;
// 	const project = await client.fetch(query, { slug });

// 	return {
// 		title: project.name,
// 	};
// }

export default async function Foundry({ params }) {
	const { slug } = params;
	const query = `*[_type == "foundry" && slug.current == $slug][0]{
		name,
		slug,
		founded,
		information,
		mainImage{crop,hotspot,asset->},
		location[]->{
			_id, name, country->{name,slug},slug
		  },
		staff[]{title,people[]->{_id,name,slug}},
		"typefaces": *[_type == "typeface" && references(^._id)]{
			_id,
			slug,
			name,
		},
		"projects": *[_type == "project" && fontsInUse[]->foundry->_id match ^._id]{
			_id,
			slug,
			title,
			name,
			posterImage{crop,hotspot,asset->},
			studio->{name},
			fontsInUse[]->{name,_id}
		}
	  }`;
	const foundry = await client.fetch(query, { slug });

	return (
		<>
			<section className="px-20 mx-auto _py-36 text-center justify-center flex flex-col h-[600px] bg-slate-300_">
				{foundry?.mainImage ? (
					<Image
						className=""
						src={builder.image(foundry.mainImage).width(2400).url()}
						width={3000}
						height={900}
						blurDataURL={foundry.mainImage.asset.metadata.lqip}
						placeholder="blur"
						alt={foundry?.name}
					/>
				) : (
					<h1 className="text-[28px] tracking-wide uppercase mb-1">
						{foundry?.name}
					</h1>
				)}
			</section>
			<section className="pb-36">
				<div className="px-6 md:px-20 grid grid-cols-12 gap-10 w-full">
					<div className="col-span-3">
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Type Foundry
							</h2>
							<ul className=" space-y-2 font-mono text-sm">
								<li>
									<Link
										href="/"
										className="underline decoration-slate-300 underline-offset-[6px] hover:decoration-slate-600 transition-colors"
									>
										{foundry?.name}
									</Link>
								</li>
							</ul>
						</div>
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Founded
							</h2>
							<ul className=" space-y-2 font-mono text-sm">
								<li>{foundry?.founded}</li>
							</ul>
						</div>

						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Location
							</h2>
							<ul className=" space-y-1 font-mono text-sm">
								{foundry.location?.map((item, index) => (
									<li key={item._id}>
										<Link
											href={`/city/${item?.slug.current}`}
											className="underline decoration-slate-300 underline-offset-[6px] hover:decoration-slate-600 transition-colors"
										>
											{item?.name}
										</Link>
										,{" "}
										<Link
											href={`/country/${item?.country.slug.current}`}
											className="underline decoration-slate-300 underline-offset-[6px] hover:decoration-slate-600 transition-colors"
										>
											{item?.country.name}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{foundry.staff?.map((item, index) => (
							<div key={index} className="mb-5">
								<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
									{item.title}
								</h2>
								<ul className=" space-y-1 font-mono text-sm">
									{item.people?.map((person, index) => (
										<li key={person._id}>
											<Link
												href={`/person/${person.slug.current}`}
												className="underline decoration-slate-300 underline-offset-[6px] hover:decoration-slate-600 transition-colors"
											>
												{person.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					<div className="article mb-10 md:mb-0 col-span-6 text-xl font-medium">
						<PortableText value={foundry?.information} />
					</div>
					<div className="article mb-10 md:mb-0 col-start-10 col-span-3">
						{/* <div>
							<div className=" aspect-[3/4] bg-slate-200"></div>
							<div className="text-xs font-mono block text-left mt-2">
								Kris Sowersby
							</div>
						</div> */}
					</div>
				</div>
			</section>
			<TypefaceBy name={foundry?.name} typefaces={foundry?.typefaces} />
			<FontsInUseBy name={foundry?.name} projects={foundry?.projects} />
		</>
	);
}
