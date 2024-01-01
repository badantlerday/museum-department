import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../../../sanity/lib/client";
import Link from "next/link";

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
			"references": *[_type in ["studio","foundry"] && location[]->_id match ^._id]{
				_id,
				title,
				name,
				_type,
				slug,
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
							<Link href={`/${reference._type}/${reference.slug.current}`}>
								<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
								<h3 className=" text-sm font-medium tracking-[0.0075rem]">
									{reference.title && <span>{reference.title}</span>}
									{reference.name && <span>{reference.name}</span>}
								</h3>
								<span className=" font-mono text-xs capitalize">
									{reference._type}
								</span>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
