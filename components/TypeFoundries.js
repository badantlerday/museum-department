import { client } from "../sanity/lib/client";
import Link from "next/link";
export default async function TypeFoundries() {
	const foundries = await client.fetch(`*[_type == "foundry"]{
    _id, name, slug
  }`);

	// console.log(foundries);

	return (
		<>
			<div className="px-20 mx-auto">
				<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
					Type Foundries
				</h2>
				<ul className="space-y-1 text-sm grid grid-flow-col grid-rows-6 grid-cols-6 font-mono">
					{foundries?.map((foundry, index) => (
						<li key={foundry._id}>
							<Link href={`foundry/${foundry?.slug.current}`}>
								{foundry.name}
							</Link>
						</li>
					))}
					{/* <li>Foundry</li>
					<li>Foundry</li>
					<li>Foundry</li>
					<li>Foundry</li>
					<li>Foundry</li>
					<li>Foundry</li>
					<li>Foundry</li>
					<li>Foundry</li>
					<li>Foundry</li>
					<li>Foundry</li>
					<li>Foundry</li>
					<li>Foundry</li>
					<li>Foundry</li>
					<li>Foundry</li>
					<li>Foundry</li>
					<li>Foundry</li>
					<li>Foundry</li>
					<li>Foundry</li> */}
				</ul>
			</div>
		</>
	);
}
