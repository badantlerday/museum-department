import LatestProjects from "@/components/LatestProjects";

export default async function Page() {
	return (
		<>
			<div className="px-10 lg:px-20 mx-auto ">
				<h1 className="text-6xl py-12 font-medium">All projects</h1>
			</div>

			<LatestProjects />
		</>
	);
}
