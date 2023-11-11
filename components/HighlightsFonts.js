import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import { client } from "../sanity/lib/client";

const builder = imageUrlBuilder(client);

export default async function HighlightsFonts() {
	const fonthighlights = await client.fetch(
		`*[_type == "settings"][0].fontgallery[]->{
			_id,name, slug, specimenPoster{crop,hotspot,asset->}
		
		}`
	);
	// console.log(fonthighlights);
	return (
		<>
			<section className="px-20 mx-auto">
				<div className="grid grid-cols-6 gap-4">
					<h2 className="text-2xl font-medium relative col-span-4 col-start-2">
						Highlights
					</h2>
					<div className="col-span-4 col-start-2 grid grid-cols-2 gap-4">
						{fonthighlights?.slice(0, 2).map((item, index) => (
							<Link key={index} href={`/font/${item.slug.current}`} passHref>
								{item?.specimenPoster ? (
									<Image
										className="_aspect-[3/4] mb-2 object-contain"
										src={builder.image(item.specimenPoster).width(500).url()}
										width={500}
										height={500}
										blurDataURL={item.specimenPoster.asset.metadata.lqip}
										placeholder="blur"
										alt={item?.name}
									/>
								) : (
									<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
								)}
								<h3 className=" text-sm">{item.name}</h3>
							</Link>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
