import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import Link from "next/link";

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
		"items": *[_type in ["studio", "project"] && references(^._id)]{
			_id,
			title,
			name,
			_type,
			slug,
			posterImage {
				crop,
				hotspot,
				asset->
			}
		}
	}`;

	const category = await client.fetch(query, { slug });

	return (
		<>
			<h1>{category.title}</h1>
			<div className="grid grid-cols-6 gap-4">
				{category.items.map(item => (
					<div key={item._id} className="bg-md-grey-100">
						<Link href={`/${item._type}/${item.slug.current}`}>
							
								{item.posterImage && (
									<Image
										src={builder.image(item.posterImage.asset).url()}
										alt={item.title || item.name}
										width={300}
										height={200}
										layout="responsive"
									/>
								)}
								<h2>{item.title || item.name}</h2>
							
						</Link>
					</div>
				))}
			</div>
		</>
	);
}