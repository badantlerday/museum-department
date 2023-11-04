import ArchiveTable from "@/components/ArchiveTable";
import TextCallout from "@/components/TextCallout";

export default function Archive() {
	const title = "Archive";
	const text = (
		<p>
			Explore the dynamic interplay between typefaces and real-world design. Our
			archive shines a spotlight on the nuances and bold choices in typography
			today.
		</p>
	);

	return (
		<>
			<section className="py-48 space-y-40">
				<TextCallout title={title} text={text} />
			</section>
			<section>
				<div className="px-20 mx-auto">
					<ArchiveTable />
				</div>
			</section>
		</>
	);
}
