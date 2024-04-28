import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import { client } from "@/lib/sanity.client";
import SectionHeader from "./SectionHeader";
import React, { Fragment } from "react";

const builder = imageUrlBuilder(client);

export default async function ExploreMore({data}) {

	// console.log(data);

	if (!data) {
		return null;
	}

	const explore =
		await client.fetch(`*[_type == "${data.documentTypes}" && "${data.country[0].name}" in location[]->country->name ] | order(_createdAt desc) {
	_id,
	name,
	title,
	slug,
	mainImage{crop,hotspot,asset->},
	location[]->{
		_id, name, country->{name}
	},
  }`);

	//Getting a list of studios from the UK
	//&& "UK" in location[]->country->name

	//Getting a list of studios from a city
	//&& "Stockholm" in location[]->name

	// console.log(explore);

	return (
		<section className="pb-36">
			<div className="px-20 mx-auto">
				<SectionHeader title={`Explore more ${data.documentTypes} from ${data.country[0].name}`} border={true} />

				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
					{explore.slice(0, 10).map((item, index) => (
						<Fragment key={item._id}>
							<Link
								key={item._id}
								href={`/studio/${item.slug.current}`}
								passHref
								className="py-1"
							>
								{item?.mainImage ? (
									<Image
										className="aspect-[3/4] mb-2 object-cover"
										src={builder.image(item.mainImage).width(500).url()}
										width={500}
										height={500}
										blurDataURL={item.mainImage.asset.metadata.lqip}
										placeholder="blur"
										alt={item?.name}
									/>
								) : (
									<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
								)}

								<h3 className="text-xs font-medium tracking-[0.0075rem] uppercase">
									{item.name} {item.title}
								</h3>
								<span className="text-xs font-medium italic block">
								{item.location[0].name}, {item.location[0].country?.name}
								</span>
							</Link>
						</Fragment>
					))}
				</div>
			</div>
		</section>
	);
}
