import { client } from "@/lib/sanity.client";
import Link from "next/link";
import SectionHeader from "./SectionHeader";
export default async function TypeFoundries() {
	const foundries = await client.fetch(`*[_type == "foundry"]{
    _id, name, slug
  }`);

	// console.log(foundries);

	return (
		<>
			<div className="px-20 mx-auto">
				<SectionHeader title="Font Foundries" border={true} />
				<ul className="space-y-1 text-sm grid grid-flow-col grid-rows-6 grid-cols-6 font-mono">
					{foundries?.map((foundry, index) => (
						<li key={foundry._id}>
							<Link href={`foundry/${foundry?.slug.current}`}>
								{foundry.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
