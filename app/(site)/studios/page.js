// https://www.sanity.io/plugins/next-sanity#cache-revalidation
export const revalidate = 60;
import TextCallout from "@/components/TextCallout";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

export default async function Studios() {
	const studios = await client.fetch(`*[_type == "studio" ]{
        _id, name, slug
      }`);
	const title = "Studios";
	const text = (
		<p>
			There’s {studios.length} studios from 54 cities and 34 countries on Museum
			Department. The most featured studio is Mouthwash (12) and the most views
			projects is Kindling.
		</p>
	);

	return (
		<>
			<section className="py-48 space-y-40">
				<TextCallout title={title} text={text} />
			</section>
			<div className="px-10 lg:px-20 mx-auto">
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
					{studios.map((item) => (
						<Link
							key={item._id}
							href={`/studio/${item.slug.current}`}
							passHref
							className="py-1"
						>
							<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
							<span className="">{item.name}</span>
						</Link>
					))}
				</div>
			</div>
		</>
	);
}
