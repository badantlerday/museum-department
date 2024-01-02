import Link from "next/link";
import SectionHeader from "./SectionHeader";
export default function TypefacesByFoundry({name,typefaces}) {

	return (
		<>
			<div className="px-20 mx-auto">
				<SectionHeader title={name} border={true} />
				<ul className="space-y-1 text-sm grid grid-flow-col grid-rows-6 grid-cols-6 font-mono">
					{typefaces?.map((typeface, index) => (
						<li key={typeface._id}>
							<Link href={`/font/${typeface?.slug.current}`}>
								{typeface.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}