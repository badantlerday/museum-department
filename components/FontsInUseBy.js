import Link from "next/link";
import SectionHeader from "./SectionHeader";
export default function FontsInUseBy({ name, projects }) {
	return (
		<>
			<div className="px-20 mx-auto">
				<SectionHeader title={`Fonts in use by ${name}`} border={true} />
				<ul className="space-y-1 text-sm grid grid-flow-col grid-rows-6 grid-cols-6 font-mono">
					{projects?.map((project, index) => (
						<li key={project._id}>
							<Link href={`/project/${project?.slug.current}`}>
								{project.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
