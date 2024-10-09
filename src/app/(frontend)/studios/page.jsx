
import { sanityFetch } from "@/sanity/lib/client"
import { getPageDesignStudios } from "@/sanity/lib/queries";
import { getUserBookmarks } from "@/app/actions";
// import PageDesignStudios from "@/components/PageDesignStudios";
// import { Suspense } from "react";
import NewStudios from "@/components/NewStudios";
import SummaryCallout from "@/components/SummaryCallout";
import GridListing from "@/components/GridListing";

export default async function Studios() {
  const {user,userBookmarks} = await getUserBookmarks();
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
    // <Suspense fallback={<div>Loading...</div>}>
    // <PageDesignStudios
    //   studios={studios}
    //   uniqueProjects={uniqueProjects}
    //   userBookmarks={userBookmarks}
    //   user={user}
    // />
    // </Suspense>
    <main className="mt-48">
      <section className="pb-20">
        <NewStudios
        data={studios}
        userBookmarks={userBookmarks}
        user={user} 
        />
      </section>
      <GridListing
        data={uniqueProjects}
        title="Recently updated"
        limit={18}
        aspect="portrait"
        userBookmarks={userBookmarks}
        user={user}
      />
      <div className="py-60">
      <SummaryCallout data={studios} button={true} />
      </div>
    </main>
  );
}