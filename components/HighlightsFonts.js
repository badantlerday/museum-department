import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import { client } from "../sanity/lib/client";
import SectionHeader from "./SectionHeader";

const builder = imageUrlBuilder(client);

export default async function HighlightsFonts() {
	const fonthighlights = await client.fetch(
		`*[_type == "settings"][0].fontgallery[]->{
			_id,name, slug, specimenPoster{crop,hotspot,asset->},foundry->{name,slug}
		
		}`
	);
	// console.log(fonthighlights);
	return (
		<>
			<section className="px-20 mx-auto">
				<div className="grid grid-cols-6">
					<div className="col-span-4 col-start-2 ">
						<SectionHeader title="Highlights" />
					</div>
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
								<h3 className=" text-sm font-medium tracking-[0.0075rem]">
									{item.name} by {item.foundry.name}
								</h3>
							</Link>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
