import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import Link from "next/link";
import ReferenceListItem from "@/components/ReferenceListItem";

const builder = imageUrlBuilder(client);

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({ params, searchParams }, parent) {
	const { slug } = params;
	const query = `*[_type == "city" && slug.current == $slug][0]{
		name,
	  }`;
	const cityMeta = await client.fetch(query, { slug });

	return {
		title: cityMeta.name,
	};
}

export default async function City({ params }) {
	const { slug } = params;
	const query = `*[_type == "city" && slug.current == $slug][0]{
			_id,
            name,
            slug,
			"references": *[_type in ["studio","foundry"] && location[]->_id match ^._id || _type in ["project"] && studio->location[]->_id match ^._id]{
				_id,
				title,
				name,
				_type,
				slug,
				posterImage{crop,hotspot,asset->},
				mainImage{crop,hotspot,asset->}
			  },
	  }`;

	const city = await client.fetch(query, { slug }); // Provide the value for $slug

	return (
		<>
			<section className="px-20 mx-auto text-center justify-center flex flex-col h-[600px] font-medium text-2xl tracking-[0.015rem]">
				<h1 className="  uppercase mb-1">{city?.name}</h1>
				<p className="">Everything that comes from {city?.name}</p>
			</section>
			<div className="px-20 mx-auto">
				<ul className="grid grid-cols-6 gap-4">
					{city?.references?.map((reference) => (
						<li key={reference._id}>
							<ReferenceListItem data={reference} />
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
