export const revalidate = 60;
import TextCallout from "@/components/TextCallout";
import { client } from "@/lib/sanity.client";
import Link from "next/link";
import StudioImageSlideshow from "@/components/StudioImageSlideshow";
import Counter from "@/components/Counter"


export default async function Studios() {
	const studios = await client.fetch(`*[_type == "studio" ]{
        _id,
		name,
		slug,
		location[]->{
			_id, name, country->{name}
		  },
		  mainImage{crop,hotspot,asset->},
		  posterImage{crop,hotspot,asset->},
		  "projects": *[_type == "project" && references(^._id)]{
			name,
			posterImage{crop,hotspot,asset->},
		},
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
			There’s <Counter number={studios.length} /> studios from <Counter number={uniqueLocationCount} /> different
			cities and <Counter number={uniqueCountryCount} /> countries currently on Museum Department.
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
							{item.projects && item.projects.length > 0 ? (
								<StudioImageSlideshow
									images={item.projects.map((p) => p.posterImage)}
									alt={item.name}
								/>
							) : (
								<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
							)}
							<span className="text-sm font-medium tracking-wide">
								{item.name} ({item.projects.length})
							</span>
						</Link>
					))}
					{/* {studios.map((item) => (
						<Link
							key={item._id}
							href={`/studio/${item.slug.current}`}
							passHref
							className="py-1"
						>
							{item.projects?.[0]?.posterImage || item.posterImage ? (
								<Image
									className="aspect-[3/4] mb-2 object-cover"
									src={builder
										.image(item.projects?.[0]?.posterImage || item.posterImage)
										.width(1000)
										.url()}
									width={800}
									height={665}
									blurDataURL={
										(item.projects?.[0]?.posterImage || item.posterImage).asset
											.metadata.lqip
									}
									placeholder="blur"
									alt={item.name}
								/>
							) : (
								<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
							)}
							<span className=" text-sm font-medium tracking-wide">
								{item.name}
							</span>
						</Link>
					))} */}
				</div>
			</div>
		</>
	);
}
