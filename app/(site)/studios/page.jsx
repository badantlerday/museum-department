// export const revalidate = 60;
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import TextCallout from "@/components/TextCallout";
import { client } from "@/lib/sanity.client";
import { sanityFetch } from "@/lib/sanity.fetch"
// import Counter from "@/components/Counter"
import NewStudios from "@/components/NewStudios";
import HoverListing from "@/components/HoverListing";
import SummaryCallout from "@/components/SummaryCallout";
import { getPageDesignStudios } from "@/lib/sanity.queries";
import { getUserBookmarks } from "@/app/actions";
import GridListing from "@/components/GridListing";

export default async function Studios() {
  // const { getUser } = getKindeServerSession();
	// const user = await getUser();
  const {user,userBookmarks} = await getUserBookmarks();
  // const { studios, recentlyUpdatedProjects } = await client.fetch(getPageDesignStudios);
  const { studios, recentlyUpdatedProjects } = await sanityFetch({ query: getPageDesignStudios, tags: ["studio","project"] })
  
  

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
      <div className="py-60">
      <SummaryCallout data={studios} button={true} />
      </div>
      {/* <HoverListing data={studios} sectionHeader="Design Studios" userBookmarks={userBookmarks} user={user} /> */}
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
