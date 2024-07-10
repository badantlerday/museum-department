import Link from "next/link";
import { client } from "@/lib/sanity.client";

export default async function TableStudios() {
	// const projects =
	// 	await client.fetch(`*[_type == "project" && defined(fontsInUse)] {
	//     _id, title, slug, year, studio->{name,slug, location[]->{
	// 			_id, name, country->{name}
	// 		  }}, fontsInUse[]->{name,_id}
	//   }`);
	const studios = await client.fetch(`*[_type == "studio"] | order(name asc) {
        _id,
        idNumber,
        name,
        slug,
        founded,
        size,
        category[]->{title},
        location[]->{
            _id, name, country->{name}
        },
      }`);

	return (
		<>
			<table className="w-full">
				<thead>
					<tr className="font-mono">
						<th className="text-left font-normal text-sm uppercase pb-4">Id</th>
						<th className="text-left font-normal text-sm uppercase pb-4">
							Studio
						</th>
						<th className="text-left font-normal text-sm uppercase pb-4">
							Location
						</th>
						<th className="text-left font-normal text-sm uppercase pb-4">
						Founded
						</th>
						<th className="text-left font-normal text-sm uppercase pb-4">
							Size
						</th>
						<th className="text-left font-normal text-sm uppercase pb-4">
							Category
						</th>

					</tr>
				</thead>
				<tbody>
					{studios?.map((item, index) => (
						<tr key={item._id} className="text-xs">
							<td className="py-1 font-mono uppercase text-md-grey-300">
								MD-DS-{String(item.idNumber).padStart(3, '0')}
							</td>
							<td>
								<Link
									href={`/studio/${item.slug.current}`}
									className="font-medium hover:italic"
								>
									{item.name}
								</Link>
							</td>
							<td className="font-medium italic">
							{item.location[0].name},{" "}
								{item.location[0].country?.name}
							</td>

							<td className=" text-md-grey-300 font-mono">{item.founded}</td>
							<td className=" text-md-grey-300 font-mono">{item.size}</td>
							<td className=" text-md-grey-300 font-mono">
								{item.category?.map((c) => c.title).join(", ")}
							</td>
							
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
