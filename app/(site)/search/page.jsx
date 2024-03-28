import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import Link from "next/link";

const builder = imageUrlBuilder(client);

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({ params, searchParams }, parent) {
	
	return {
		title: "Search",
	};
}

export default async function Search({ params }) {
	const { slug } = params;
	

	return (
		<>
			<section className="px-20 mx-auto text-center justify-center flex flex-col h-[600px] font-medium text-2xl tracking-[0.015rem]">
				<h1 className="  uppercase mb-1">Search</h1>

			</section>
			<div className="px-20 mx-auto">
				[List of search results here.]
			</div>
		</>
	);
}
