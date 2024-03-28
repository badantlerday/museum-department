import Link from "next/link";
import { client } from "@/lib/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
const builder = imageUrlBuilder(client);

export default async function NewStudios() {

    const newStudios = await client.fetch(`*[_type == "studio"] | order(_createdAt desc){
        _id,
		_createdAt,
		name,
		slug,
		location[]->{
			_id, name, country->{name}
		},
		  mainImage{crop,hotspot,asset->},
		  posterImage{crop,hotspot,asset->},
		  "projects": *[_type == "project" && references(^._id)]{
			name,
			posterImage{crop,hotspot,asset->},
		},
      }`);

	return (
		<section className="mb-40">
				<div className="px-10 lg:px-20 mx-auto">
				<h3 className=" text-2xl font-medium mb-4 ">New Studios</h3>
				<div className="grid grid-cols-2 gap-x-4 ">
				{newStudios.slice(0, 2).map((item) => (
					<div key={`new-studio-${item._id}`}>
						<div className="w-full aspect-[4/3] bg-md-grey-100 mb-2 relative" >
							<div className="uppercase text-[8px] font-medium bg-white absolute top-4 left-4 py-1 px-2 tracking-wider">New studio</div>
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
                        </div>
						<span className="text-xs font-medium tracking-wide block uppercase">
							{item.name} ({item.projects.length})
						</span>
						<span className="text-xs font-medium italic block">
								{item.location[0].name}, {item.location[0].country?.name}
						</span>
					</div>
				))}

				</div>
				</div>
			</section>
	);
}
