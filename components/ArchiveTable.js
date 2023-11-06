import Link from "next/link";
import { client } from "../sanity/lib/client";

export default async function ArchiveTable() {
	// const projects =
	// 	await client.fetch(`*[_type == "project" && defined(fontsInUse)] {
	//     _id, title, slug, year, studio->{name,slug, location[]->{
	// 			_id, name, country->{name}
	// 		  }}, fontsInUse[]->{name,_id}
	//   }`);
	const projects = await client.fetch(`*[_type == "project"] {
        _id, title, slug, year, studio->{name,slug, location[]->{
				_id, name, country->{name}
			  }}, fontsInUse[]->{name,_id}
      }`);

	return (
		<>
			<table className="w-full">
				<thead>
					<tr className="font-mono">
						<th className="text-left font-normal text-sm uppercase pb-4">Id</th>
						<th className="text-left font-normal text-sm uppercase pb-4">
							Project
						</th>
						<th className="text-left font-normal text-sm uppercase pb-4">
							Made by
						</th>
						<th className="text-left font-normal text-sm uppercase pb-4">
							Category
						</th>
						<th className="text-left font-normal text-sm uppercase pb-4">
							Location
						</th>
						<th className="text-left font-normal text-sm uppercase pb-4">
							Year
						</th>
					</tr>
				</thead>
				<tbody>
					{projects?.map((project, index) => (
						<tr key={project._id}>
							<td className="py-1 font-mono text-sm uppercase">
								Md-00{index + 1}-CAT-00{index + 1}
							</td>
							<td>
								<Link
									href={`/project/${project.slug.current}`}
									className="font-medium hover:italic"
								>
									{project.title}
								</Link>
							</td>
							<td>{project.studio.name}</td>

							<td>Category</td>
							<td>
								{project.studio.location[0].name},{" "}
								{project.studio.location[0].country?.name}
							</td>
							<td>{project.year}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
