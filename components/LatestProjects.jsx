import Link from "next/link";
import { sanityFetch } from "@/lib/sanity.fetch"
import { client } from "@/lib/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
const builder = imageUrlBuilder(client);


export default async function LatestProjects() {
	const query = `*[_type == "project" && defined(slug.current)]{
        _id,
		title,
		slug,
		posterImage{crop,hotspot,asset->},
		studio->{name}
      }`
	const projects = await sanityFetch({ query, tags: ["projects"] })
	
	return (
		<>
			<div className="px-4 lg:px-20 mx-auto">
				{/* <h2 className="text-2xl py-4 font-medium relative">
					{sectionTitle}
					<span className=" text-[12px] absolute mt-[-8px] ml-1">
						{projects.length}
					</span>
				</h2> */}
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
					{projects.map((project) => (
						<Link
							key={project._id}
							href={`/project/${project.slug.current}`}
							passHref
							className="py-1 font-medium"
						>
							 {project.posterImage || project.posterImage ? (
								
								<Image
								className="aspect-[3/4] mb-2 object-cover"
								src={builder
									.image(project.posterImage || project.posterImage)
									.width(800)
									.url()}
								width={800}
								height={665}
								blurDataURL={
									(project.posterImage || project.posterImage).asset
										.metadata.lqip
								}
								placeholder="blur"
								alt={project.name}
							/>
							) : (
								<div className="w-full aspect-[3/4] bg-md-grey-100 mb-2"></div>
							)}


							
							<span className="text-xs font-medium tracking-wide block uppercase">
							{project.title}
						</span>
						<span className="text-xs font-medium italic block">
						{project.studio.name}
						</span>
						</Link>
					))}
				</div>
			</div>
			
		</>
	);
}
