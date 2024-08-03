import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import Link from "next/link";
import GridListing from "@/components/GridListing";

const builder = imageUrlBuilder(client);

export async function generateMetadata({ params, searchParams }, parent) {
	const { slug } = params;
	const query = `*[_type == "category" && slug.current == $slug][0]{
		title
	}`;
	const categoryMeta = await client.fetch(query, { slug });

	return {
		title: categoryMeta?.title || "Category",
	};
}

export default async function Category({ params }) {
	const { slug } = params;

	const query = `*[_type == "category" && slug.current == $slug][0]{
		_id,
		title,
		slug,
		"projects": *[_type == "project" && references(^._id)]{
			_id,
			title,
			_type,
			slug,
			posterImage {
				crop,
				hotspot,
				asset->
			},
			studio->{
				_id,
				name,
				slug,
				location[]->{
					_id,
					name,
					country->{name}
				},
				posterImage{crop,hotspot,asset->},
			},
		},
		"studios": *[_type == "studio" && references(^._id)]{
			_id,
			name,
			_type,
			slug,
			posterImage {
				crop,
				hotspot,
				asset->
			},
			location[]->{
				_id,
				name,
				country->{name}
			},
		},
		"fonts": *[_type == "project" && defined(fontsInUse) && references(^._id)]{
			_id, 
			title, 
			slug,
			publishedAt, 
			studio->{name,slug}, 
			fontsInUse[]->{name,_id,slug,foundry->},
			posterImage{crop,hotspot,asset->},
		}
	}`;

	const category = await client.fetch(query, { slug });
	// console.log(category);

	return (
		<>
			<section className="my-32 text-center">
				<h1 className="font-black uppercase text-5xl">{category.title}</h1>
				<div className="font-medium text-xl mt-4">is referenced in the following places</div>
			</section>

			<GridListing data={category.studios} title={`${category.studios.length} Studios`} limit={18} />
			<GridListing data={category.projects} title={`${category.projects.length} Projects`} limit={18} />
			<GridListing data={category.fonts} title={`${category.fonts.length} Fonts`} limit={18} />
		</>
	);
}