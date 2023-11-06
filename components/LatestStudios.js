import Link from "next/link";
import { client } from "../sanity/lib/client";

export default async function LatestStudios() {
	const studios = await client.fetch(`*[_type == "studio" ]{
        _id, name, slug
      }`);
	const sectionTitle = studios.length === 1 ? `Studio` : `Studios`;

	return (
		<>
			<div className="px-4 lg:px-20 mx-auto">
				<h2 className="text-2xl py-4 font-medium relative">
					{sectionTitle}
					<span className=" text-[12px] absolute mt-[-8px] ml-1">
						{studios.length}
					</span>
				</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
					{studios.map((item) => (
						<Link
							key={item._id}
							href={`/studio/${item.slug.current}`}
							passHref
							className="py-1"
						>
							<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
							<span className="">{item.name}</span>
						</Link>
					))}
				</div>
			</div>
		</>
	);
}
