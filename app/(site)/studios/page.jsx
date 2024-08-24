export const revalidate = 60;
// import TextCallout from "@/components/TextCallout";
import { client } from "@/lib/sanity.client";
// import Counter from "@/components/Counter"
import NewStudios from "@/components/NewStudios";
import HoverListing from "@/components/HoverListing";
import SummaryCallout from "@/components/SummaryCallout";
// import { Book, Grid } from "lucide-react";
import GridListing from "@/components/GridListing";

export default async function Studios() {
  const studios = await client.fetch(`*[_type == "studio" ] | order(name asc){
        _id,
		_type,
		_createdAt,
		_type,
		name,
		slug,
		location[]->{
			_id, name, country->{name}
		},
		mainImage{crop,hotspot,asset->},
		posterImage{crop,hotspot,asset->}
      }`);

  const recentlyUpdatedProjects =
    await client.fetch(`*[_type == "project" ] | order(updatedAt asc){
        _id,
		title,
		_type,
		slug,
		posterImage{crop,hotspot,asset->},
		studio->{
			_id,
			name,
			slug,
			location[]->{
				_id,
				name,
				slug,
				country->{name,slug}
			},
			posterImage{crop,hotspot,asset->},
			"countProjects": count(*[_type == "project" && references(^._id)])
		},
    }`);

  // Filter out projects to ensure only one project per studio
  function filterProjects(projects) {
    const studioMap = new Map();
    const uniqueProjects = [];

    projects.forEach((project) => {
      const studioId = project.studio._id;
      if (!studioMap.has(studioId)) {
        studioMap.set(studioId, true);
        uniqueProjects.push(project);
      }
    });

    return uniqueProjects;
  }
  const uniqueProjects = filterProjects(recentlyUpdatedProjects);

  return (
    <main className="mt-48">
      <section className="pb-20">
        <NewStudios />
      </section>
      <GridListing
        data={uniqueProjects}
        title="Recently updated"
        limit={18}
        aspect="portrait"
      />
      <SummaryCallout data={studios} />
      <HoverListing data={studios} sectionHeader="Design Studios" />
    </main>
  );
}

// // Initialize Sets to store unique locations and countries
// const uniqueLocations = new Set();
// const uniqueCountries = new Set();

// // Iterate over the array of studios using destructuring and optional chaining
// studios.forEach(({ location }) => {
// 	location?.forEach(({ name, country }) => {
// 		uniqueLocations.add(name);
// 		if (country?.name) uniqueCountries.add(country.name);
// 	});
// });

// // The size of the Set is the count of unique elements
// const uniqueLocationCount = uniqueLocations.size;
// const uniqueCountryCount = uniqueCountries.size;

// const title = "Studios";
// const text = (
// 	<p>
// 		There’s <Counter number={studios.length} /> studios from <Counter number={uniqueLocationCount} /> different
// 		cities and <Counter number={uniqueCountryCount} /> countries currently on Museum Department.
// 	</p>
// );
