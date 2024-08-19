import Link from "next/link";
import { client } from "@/lib/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
const builder = imageUrlBuilder(client);
import BookmarkButton from "@/components/BookmarkButton";

export default async function NewStudios() {

    const newStudios = await client.fetch(`*[_type == "studio"] | order(publishedAt desc){
        _id,
		_createdAt,
		publishedAt,
		name,
		slug,
		location[]->{
			_id, name, _type, slug, country->{name,_type,slug}
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
				<div className="px-10 lg:px-18 mx-auto">
				<h3 className=" text-xl font-medium mb-4 ">New Studios</h3>
				<div className="grid grid-cols-2 gap-x-4 ">
				{newStudios.slice(0, 2).map((item) => (
				<div key={item._id}>
					<Link
							href={`/studio/${item.slug?.current}`}
					> 
					{item.mainImage || item.mainImage ? (			
						<Image
							className="aspect-[4/3] mb-2 object-cover w-full"
							src={builder
								.image(item.mainImage || item.mainImage)
								.width(2000)
								.url()}
							width={1200}
							height={1200}
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
					</Link>
					<div className="flex">
						<div className="flex-1">
							<span className="font-medium tracking-wide block uppercase -mb-1">
								<Link href={`/studio/${item.slug?.current}`} className="hover:text-md-grey-500"> {item.name} ({item.projects.length})</Link>
							</span>
							<span className="font-medium italic block">
									{/* {item.location[0].name}, {item.location[0].country?.name} */}
									<Link href={`/reference/${item.location[0].slug.current}`} className="hover:text-md-grey-500">
										{item.location[0].name}
									</Link>, { } 
									<Link href={`/reference/${item.location[0].country?.slug.current}`} className="hover:text-md-grey-500">
										{item.location[0].country?.name}
									</Link>
							</span>
						</div>
						<div>
							<BookmarkButton documentId={item._id} variant="icon" message={`${item?.name}`} />
						</div>
					</div>
				</div>
                   
				))}

				</div>
				</div>
			</section>
	);
}
