// https://www.sanity.io/plugins/next-sanity#cache-revalidation
export const revalidate = 60;
import TextCallout from "@/components/TextCallout";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

export default async function Studios() {
	const studios = await client.fetch(`*[_type == "studio" ]{
        _id, name, slug, location[]->{
			_id, name, country->{name}
		  }
      }`);

	// Initialize Sets to store unique locations and countries
	const uniqueLocations = new Set();
	const uniqueCountries = new Set();

	// Iterate over the array of studios using destructuring and optional chaining
	studios.forEach(({ location }) => {
		location?.forEach(({ name, country }) => {
			uniqueLocations.add(name);
			if (country?.name) uniqueCountries.add(country.name);
		});
	});

	// The size of the Set is the count of unique elements
	const uniqueLocationCount = uniqueLocations.size;
	const uniqueCountryCount = uniqueCountries.size;

	const title = "Studios";
	const text = (
		<p>
			There’s {studios.length} studios from {uniqueLocationCount} different
			cities and {uniqueCountryCount} countries currently on Museum Department.
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
