import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import BookmarkButton from "./BookmarkButton";
const builder = imageUrlBuilder(client);

export default function StudioFeaturedWork({ name, featuredWork }) {
	return (
		<section className="pb-36">
			<div className="px-20 mx-auto">
				<h2 className="font-medium text-2xl border-t border-[#E6E6E6] pt-6 pb-4">
					Featured Work by <span className="uppercase">{name}</span>
				</h2>
			</div>

			<div className="grid grid-cols-3 px-20 mx-auto gap-4">
				{featuredWork?.map((work, index) => (
					<div key={work._id}>
						<Link href={`/project/${work.slug.current}`}>
							{work?.posterImage ? (
								<Image
									className="aspect-[3/4] mb-2 object-cover"
									src={builder.image(work.posterImage).width(1000).url()}
									width={1000}
									height={665}
									blurDataURL={work.posterImage.asset.metadata.lqip}
									placeholder="blur"
									alt={work?.name}
								/>
							) : (
								<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
							)}
						</Link>
						<div className="flex items-center">
							<div className="flex-1">
								<span className=" text-sm font-medium tracking-wide">
									{work.title}
								</span>
							</div>
							<div>
								<BookmarkButton
									documentId={work._id}
									variant="icon"
									message={`${work?.title}`}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
