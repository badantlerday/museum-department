import Link from "next/link";
import { client } from "@/lib/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
const builder = imageUrlBuilder(client);
import SectionHeader from "./SectionHeader";

export default async function FontsGalleryGrid() {
    const fontsinuse = await client.fetch(`*[_type == "project" && defined(fontsInUse)] {
        _id, title, slug, studio->{name}, fontsInUse[]->{name,_id},posterImage{crop,hotspot,asset->},
      }`);
	
	return (
		<>
			<div className="px-20 mx-auto grid grid-cols-1">
				<SectionHeader title="Fonts Gallery" />
				<div className="grid grid-cols-6 gap-4">
					{fontsinuse?.map((project, index) => (
						<Link key={project._id} href={`project/${project.slug.current}`}>
							{project?.posterImage ? (
									<Image
										className="aspect-[3/4] mb-2 object-cover"
										src={builder.image(project.posterImage).width(500).url()}
										width={500}
										height={665}
										blurDataURL={project.posterImage.asset.metadata.lqip}
										placeholder="blur"
										alt={project?.name}
									/>
								) : (
									<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
								)}
							{project.fontsInUse?.map((typeface, index) => (
								<h3 key={`fontinuse-${index}-${typeface._id}`} className=" text-sm font-medium tracking-[0.0075rem]">
									{typeface.name}
								</h3>
							))}
							<div className="text-sm font-medium tracking-[0.0075rem] mt-1 text-[#aaa]">
								<h4>
									{project.title}
									{/* by {project.studio.name} */}
								</h4>
							</div>
						</Link>
					))}
				</div>
			</div>
		</>
	);
}
