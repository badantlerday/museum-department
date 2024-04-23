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
			<div className="mx-auto px-16 pb-48">
				<div className="grid grid-cols-24 gap-4">
				<h2 className="text-xl font-medium col-span-full col-start-3">New Fonts Gallery</h2>

				{fontsinuse?.slice(0, 2).map((project, index) => (
				<div key={project._id} className={index === 0 ? "col-start-3 col-end-12" : "col-start-14 col-end-23"}>
					<Link href={`project/${project.slug.current}`}>
					<div className="aspect-[3/4] mb-2">
						{project?.posterImage ? (
						<Image
							className="object-cover aspect-[3/4]"
							src={builder.image(project.posterImage).width(1000).url()}
							width={1000}
							height={665}
							blurDataURL={project.posterImage.asset.metadata.lqip}
							placeholder="blur"
							alt={project?.name}
						/>
						) : (
						<div className="w-full aspect-[3/4] bg-slate-100"></div>
						)}
					</div>
					{project.fontsInUse?.map((typeface, index) => (
						<h3 key={`fontinuse-${index}-${typeface._id}`} className="text-xs font-medium tracking-wide block uppercase">
						{typeface.name}
						</h3>
					))}
					<div className="text-xs font-medium italic block">
						<h4>
						{project.title}
						</h4>
					</div>
					</Link>
				</div>
				))}


				</div>
			</div>

			<div className="px-16 mx-auto grid grid-cols-1">
				{/* <SectionHeader title="Fonts Gallery" /> */}
				<div className="grid grid-cols-6 gap-4">
					{fontsinuse?.slice(2).map((project, index) => (
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
								<h3 key={`fontinuse-${index}-${typeface._id}`} className="text-xs font-medium tracking-wide block uppercase">
									{typeface.name}
								</h3>
							))}
							<div className="text-xs font-medium italic block">
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
