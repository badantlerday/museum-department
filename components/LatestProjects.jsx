import Link from "next/link";
import { sanityFetch } from "@/lib/sanity.fetch"


export default async function LatestProjects() {
	const query = `*[_type == "project" && defined(slug.current)]{
        _id, title, slug, studio->{name}
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
							className="py-1"
						>
							<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
							<span className="">{project.title}</span>
							<span className="text-xs  tracking-wider block">
								{" "}
								From {project.studio.name}
							</span>
						</Link>
					))}
				</div>
			</div>
			
		</>
	);
}
