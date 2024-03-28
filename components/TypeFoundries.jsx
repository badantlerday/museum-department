import { client } from "@/lib/sanity.client";
import Link from "next/link";
import SectionHeader from "./SectionHeader";


export async function NewTypeFoundries() {
	const foundries = await client.fetch(`*[_type == "foundry"]{
    _id, name, slug
  }`);

	return (
		<>
			<section>
			<div className="mx-auto px-16 pt-48 pb-10 ">
				<h2 className="text-xl font-medium mb-4">New Font Foundries</h2>
				
				<div className="grid grid-cols-2 gap-4" >
				{foundries.slice(0, 2).map((item) => (
					<div key={item._id}>
					<div className="bg-md-grey-100 aspect-[4/3] mb-2"></div>
					<span className="text-xs font-medium tracking-wide block uppercase">
					{item.name}
						</span>
						<span className="text-xs font-medium italic block">
								country and city
						</span>
					</div>
					))}
				</div>
				
			</div>
		</section>
		<section>
			<div className="mx-auto px-16 py-10">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{foundries.slice(2, 6).map((item) => (
					<div key={item._id}>
					<div className="bg-md-grey-100 aspect-[4/3] mb-2"></div>
					<span className="text-xs font-medium tracking-wide block uppercase">
					{item.name}
						</span>
						<span className="text-xs font-medium italic block">
								country and city
						</span>
					</div>
					))}
				</div>
			</div>
		</section>
		</>
	);
}

export async function TypeFoundries() {
	const foundries = await client.fetch(`*[_type == "foundry"]{
    _id, name, slug
  }`);

	return (
		<>
			<div className="px-20 mx-auto">
				<SectionHeader
					title={`${foundries.length} Font Foundries`}
					border={true}
				/>
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
