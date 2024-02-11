import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import Link from "next/link";
import ReferenceListItem from "@/components/ReferenceListItem";

const builder = imageUrlBuilder(client);

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({ params, searchParams }, parent) {
	const { slug } = params;
	const query = `*[_type == "country" && slug.current == $slug][0]{
		name,
	  }`;
	const countrynMeta = await client.fetch(query, { slug });

	return {
		title: countrynMeta.name,
	};
}

export default async function Country({ params }) {
	const { slug } = params;
	const query = `*[_type == "country" && slug.current == $slug][0]{
			_id,
            name,
            slug,
			"cities": *[_type == "city" && country->_id match ^._id]{
				_id,
				name,
				slug,
			},
			"references": *[_type in ["studio","foundry"] && location[]->country->_id match ^._id || _type in ["project"] && studio->location[]->country->_id match ^._id]{
				_id,
				title,
				name,
				_type,
				slug,
				posterImage{crop,hotspot,asset->},
				mainImage{crop,hotspot,asset->}
			},
	  }`;

	const country = await client.fetch(query, { slug }); // Provide the value for $slug

	return (
		<>
			<section className="px-20 mx-auto text-center justify-center flex flex-col h-[600px] font-medium text-2xl tracking-[0.015rem]">
				<h1 className="  uppercase mb-1">{country?.name}</h1>
				<p className="">Everything that comes from {country?.name}</p>
				<ul className="flex mx-auto gap-2 mt-2">
					{country?.cities?.map((city) => (
						<li key={city._id}>
							<Link
								href={`/city/${city.slug.current}`}
								className="text-xs bg-slate-200 p-2 rounded"
							>
								{city.name}
							</Link>
						</li>
					))}
				</ul>
			</section>
			<div className="px-20 mx-auto">
				<ul className="grid grid-cols-6 gap-4">
					{country?.references?.map((reference) => (
						<li key={reference._id}>
							<ReferenceListItem data={reference} />
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
