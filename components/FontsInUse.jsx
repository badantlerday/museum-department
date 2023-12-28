import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { client } from "../sanity/lib/client";
const builder = imageUrlBuilder(client);

export default async function FontsInUse() {
    const fontsinuse = await client.fetch(`*[_type == "project" && defined(fontsInUse)] {
        _id, title, slug, posterImage{crop,hotspot,asset->}, studio->{name}, fontsInUse[]->{name,_id}
      }`);
	const sectionTitle = fontsinuse.length === 1 ? `Font Gallery` : `Fonts Gallery`;

	return (
		<>
			<div className="px-4 lg:px-20 mx-auto grid grid-cols-1">
				<h2 className="text-2xl py-4 font-medium relative">
					{sectionTitle}
					<span className=" text-[12px] absolute mt-[-8px] ml-1 hidden">
						{fontsinuse.length}
					</span>
				</h2>
				<div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
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
							<div className="text-xs mt-1 opacity-70 hidden">
								<h4 className="">
									{project.title} by {project.studio.name}
								</h4>
							</div>
						</Link>
					))}
				</div>
			</div>
		</>
	);
}
