import LatestProjects from "@/components/LatestProjects";
import { sanityFetch } from "@/lib/sanity.fetch";
import TextCallout from "@/components/TextCallout";

export default async function Projects() {
	const query = `{
		"projectCount": count(*[_type == "project"]),
		"studioCount": count(*[_type == "studio"])
	  }`;
	const data = await sanityFetch({ query, tags: ["project"] });

	const title = "Projects";
	const text = (
		<p>
			There’s {data.projectCount} projects from {data.studioCount} different
			studios currently on Museum Department.
		</p>
	);

	return (
		<>
			<section className="py-48 space-y-40">
				<TextCallout title={title} text={text} />
			</section>
			<LatestProjects />
		</>
	);
}
