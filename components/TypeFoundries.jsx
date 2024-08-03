import { client } from "@/lib/sanity.client";
import Link from "next/link";
import SectionHeader from "./SectionHeader";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
const builder = imageUrlBuilder(client);


export async function NewTypeFoundries() {
	const foundries = await client.fetch(`*[_type == "foundry"]{
    _id,
	name,
	slug,
	mainImage{crop,hotspot,asset->},
	location[]->{
		_id, name, country->{name}
	},
  }`);

//   console.log(foundries)

	return (
		<>
			<section>
			<div className="mx-auto px-18 pt-48 pb-10 ">
				<h2 className="text-xl font-medium mb-4">Type Foundries</h2>
				
				<div className="grid grid-cols-2 gap-4" >
				{foundries.slice(0, 2).map((item) => (
					<Link
					key={item._id}
					href={`/foundry/${item.slug.current}`}
					
				>
					{item.mainImage || item.mainImage ? (							
								<Image
								className="aspect-[4/3] mb-2 object-cover"
								src={builder
									.image(item.mainImage || item.mainImage)
									.width(1000)
									.url()}
								width={800}
								height={665}
								blurDataURL={
									(item.mainImage || item.mainImage).asset
										.metadata.lqip
								}
								placeholder="blur"
								alt={item.name}
							/>
							) : (
								<div className="w-full aspect-[4/3] bg-md-grey-100 mb-2"></div>
							)}
						<span className="font-medium tracking-wide block uppercase -mb-1">
						{item.name}
						</span>
						{item.location && (
						<span className="font-medium italic block">
							{item.location[0].name}, {item.location[0].country?.name}
						</span>
						)}
					</Link>
					))}
				</div>
				
			</div>
		</section>
		<section>
			<div className="mx-auto px-16 py-10">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{foundries.slice(2, 6).map((item) => (
					
						<Link
							key={item._id}
							href={`/foundry/${item.slug.current}`}
						
							className="py-1 font-medium"
						>
					{item.mainImage || item.mainImage ? (
								
								<Image
								className="aspect-[4/3] mb-2 object-cover"
								src={builder
									.image(item.mainImage || item.mainImage)
									.width(500)
									.url()}
								width={800}
								height={665}
								blurDataURL={
									(item.mainImage || item.mainImage).asset
										.metadata.lqip
								}
								placeholder="blur"
								alt={item.name}
							/>
							) : (
								<div className="w-full aspect-[4/3] bg-md-grey-100 mb-2"></div>
							)}
					<span className="text-xs font-medium tracking-wide block uppercase">
					{item.name}
						</span>
						{item.location && (
						<span className="text-xs font-medium italic block">
							{item.location[0].name}, {item.location[0].country?.name}
						</span>
						)}
					</Link>
					))}
				</div>
			</div>
		</section>
		</>
	);
}

export async function TypeFoundries() {
	const foundries = await client.fetch(`*[_type == "foundry"]{
    _id, name, slug
  }`);

	return (
		<>
			<div className="px-20 mx-auto">
				<SectionHeader
					title={`${foundries.length} Font Foundries`}
					border={true}
				/>
				<ul className="space-y-1 text-xs grid grid-flow-col grid-rows-6 grid-cols-6 font-mono">
					{foundries?.map((foundry, index) => (
						<li key={foundry._id}>
							<Link href={`foundry/${foundry?.slug.current}`}>
								{foundry.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
