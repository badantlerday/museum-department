import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
const builder = imageUrlBuilder(client);

export default function StudioFeaturedWork({ name, featuredWork }) {
	return (
		<section className="pb-36">
			<div className="px-20 mx-auto">
				<h2 className="font-medium text-2xl border-t border-[#E6E6E6] pt-6 pb-4">
					Featured Work by <span className="uppercase">{name}</span>
				</h2>
			</div>

			<div className="grid grid-cols-3 px-20 mx-auto gap-10">
				{featuredWork?.map((work, index) => (
					<Link
						key={work._id}
						href={`/project/${work.slug.current}`}
						passHref
						className="py-1"
					>
						{work?.posterImage ? (
							<Image
								className="aspect-[3/4] mb-2 object-cover"
								src={builder.image(work.posterImage).width(500).url()}
								width={500}
								height={665}
								blurDataURL={work.posterImage.asset.metadata.lqip}
								placeholder="blur"
								alt={work?.name}
							/>
						) : (
							<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
						)}
						<span className=" text-sm font-medium tracking-wide">
							{work.title}
						</span>
					</Link>
				))}
			</div>
		</section>
	);
}
