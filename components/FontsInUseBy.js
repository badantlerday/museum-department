import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { client } from "../sanity/lib/client";
const builder = imageUrlBuilder(client);
import SectionHeader from "./SectionHeader";
export default function FontsInUseBy({ name, projects }) {
	return (
		<>
			<div className="px-20 mx-auto">
				<SectionHeader
					title={`Fonts in use by ${name.toUpperCase()}`}
					border={true}
				/>
				<ul
					className={` text-sm grid gap-4 mt-2 ${
						projects.length < 6 ? "grid-cols-4" : "grid-cols-6"
					}`}
				>
					{projects?.map((project, index) => (
						<li key={project._id}>
							<Link href={`/project/${project?.slug.current}`}>
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
									<h3
										key={`fontinuse-${index}-${typeface._id}`}
										className=" text-sm font-medium tracking-[0.0075rem]"
									>
										{typeface.name}
									</h3>
								))}
								<div className="text-sm font-medium text-[#AAA] tracking-[0.0075rem]">
									<h4 className="">
										{project.title} by {project.studio.name}
									</h4>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
