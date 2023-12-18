import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import { client } from "../sanity/lib/client";

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
	const sectionTitle = studios.length === 1 ? `Studio` : `Studios`;

	return (
		<>
			<div className="px-4 lg:px-20 mx-auto">
				<div className="flex py-4">
					<h2 className="text-2xl font-medium relative grow">
						{sectionTitle}
						<span className=" text-[12px] absolute mt-[-8px] ml-1 hidden">
							{studios.length}
						</span>
					</h2>
					{/* <Link href="/studios" className=" self-end text-sm font-medium">
						View all
					</Link> */}
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
					{studios.slice(0, 8).map((item) => (
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

							<span className="">{item.name}</span>
						</Link>
					))}
				</div>
			</div>
		</>
	);
}
