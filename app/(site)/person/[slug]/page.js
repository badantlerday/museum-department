import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import Link from "next/link";
import ReferenceListItem from "@/components/ReferenceListItem";

const builder = imageUrlBuilder(client);

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({ params, searchParams }, parent) {
	const { slug } = params;
	const query = `*[_type == "person" && slug.current == $slug][0]{
		name,
	  }`;
	const personMeta = await client.fetch(query, { slug });

	return {
		title: personMeta.name,
	};
}

export default async function Studio({ params }) {
	const { slug } = params;
	const query = `*[_type == "person" && slug.current == $slug][0]{
			_id,
            name,
            slug,
			"references": *[_type in ["studio", "project", "foundry"] && references(^._id)]{
				_id,
				title,
				name,
				_type,
				slug,
				posterImage{crop,hotspot,asset->},
				mainImage{crop,hotspot,asset->}
			  }
	  }`;

	const person = await client.fetch(query, { slug }); // Provide the value for $slug

	return (
		<>
			<section className="px-20 mx-auto text-center justify-center flex flex-col h-[600px] font-medium text-2xl tracking-[0.015rem]">
				<h1 className="  uppercase mb-1">{person?.name}</h1>
				<p className="">
					{person?.name.split(" ")[0]} is referenced in the the following
				</p>
			</section>
			<div className="px-20 mx-auto">
				<ul className="grid grid-cols-6 gap-4">
					{person?.references?.map((reference) => (
						<li key={reference._id}>
							<ReferenceListItem data={reference} />
							{reference.staff?.title}
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
