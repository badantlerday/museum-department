import LatestProjects from "@/components/LatestProjects";
import { sanityFetch } from "@/lib/sanity.fetch";
// import TextCallout from "@/components/TextCallout";
// import GridListing from "@/components/GridListing";

export default async function Projects() {

	const query = `{
		"projectCount": count(*[_type == "project"]),
		"studioCount": count(*[_type == "studio"])
	  }`;
	const data = await sanityFetch({ query, tags: ["project"] });

	// const title = "Projects";
	// const text = (
	// 	<p>
	// 		There’s {data.projectCount} projects from {data.studioCount} different
	// 		studios currently on Museum Department.
	// 	</p>
	// );

	return (
		<main className="mt-48">
			<section className="">
				<div className="px-18 mx-auto">
					<div className="flex _gap-10 _border-t border-md-grey-200">
						<h3 className=" text-xl font-medium mb-4">Latest projects</h3>
						{/* <h3 className=" text-xl font-medium mb-4 text-md-grey-300">Shuffle</h3> */}
					</div>
				</div>
			</section>
			<LatestProjects />
		</main>
	);
}
