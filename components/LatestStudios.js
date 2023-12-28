import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import { client } from "../sanity/lib/client";
import SectionHeader from "./SectionHeader";
import React, { Fragment } from "react";

const builder = imageUrlBuilder(client);

export default async function LatestStudios() {
	// const studios =
	// 	await client.fetch(`*[_type == "studio" ] | order(_createdAt desc)[0..7]{
	//     _id, name, slug
	//   }`);

	const studios =
		await client.fetch(`*[_type == "studio" ] | order(_createdAt desc) {
        _id, name, slug, mainImage{crop,hotspot,asset->}
      }`);
	// const sectionTitle = studios.length === 1 ? `Studio` : `Studios`;

	return (
		<>
			<div className="px-4 lg:px-20 mx-auto">
				<SectionHeader title="Studios" />

				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
					{studios.slice(0, 9).map((item, index) => (
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

								<h3 className="text-sm font-medium tracking-[0.0075rem]">
									{item.name}
								</h3>
							</Link>
							{index === 3 && (
								// Add your additional link JSX here
								<Link
									key="studio-sponsor"
									href="/your-additional-link"
									className=" order-last lg:order-none"
								>
									<div className="w-full aspect-[3/4] bg-stone-100 mb-2 relative">
										<div className="absolute inset-0 flex items-center justify-center">
											<p className="text-sm font-medium tracking-[0.0075rem] flex flex-col">
												<span>SPONSOR SPOT</span> <span>AVAILABLE</span>
											</p>
										</div>
									</div>
									<h3 className="text-sm font-medium tracking-[0.0075rem]">
										Interested? Get in touch
									</h3>
								</Link>
							)}
						</Fragment>
					))}
				</div>
			</div>
		</>
	);
}
