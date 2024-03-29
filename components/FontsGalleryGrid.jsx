import Link from "next/link";
import { client } from "../sanity/lib/client";

export default async function FontsGalleryGrid() {
    const fontsinuse = await client.fetch(`*[_type == "project" && defined(fontsInUse)] {
        _id, title, slug, studio->{name}, fontsInUse[]->{name,_id}
      }`);
	
	return (
		<>
			<div className="px-20 mx-auto grid grid-cols-1">
				<h2 className="text-2xl py-4 font-medium relative">
				Fonts Gallery

				</h2>
				<div className="grid grid-cols-6 gap-4">
					{fontsinuse?.map((project, index) => (
						<Link key={project._id} href={`project/${project.slug.current}`}>
							<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
							{project.fontsInUse?.map((typeface, index) => (
								<h3 key={`fontinuse-${index}-${typeface._id}`} className=" text-sm">
									{typeface.name}
								</h3>
							))}
							{/* <div className="text-xs mt-1 opacity-70">
								<h4 className="">
									{project.title} by {project.studio.name}
								</h4>
							</div> */}
						</Link>
					))}
				</div>
			</div>
		</>
	);
}
