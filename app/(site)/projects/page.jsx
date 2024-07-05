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
			<section className="py-48 _space-y-40">
			<h1 className="text-center text-7xl font-black mx-auto flex flex-col mb-10 tracking-[-1%] leading-[68px] uppercase">
          <span>Projects</span>
        </h1>
		<div className="px-4 lg:px-0 article font-medium text-xl lg:text-2xl max-w-4xl mx-auto tracking-[0.5%]">
		<p>{text}</p>
		</div>
				{/* <TextCallout title={title} text={text} /> */}
			</section>
			<LatestProjects />
		</>
	);
}
