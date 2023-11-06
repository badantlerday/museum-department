// export const revalidate = 60;
import FontsGalleryGrid from "@/components/FontsGalleryGrid";
import Highlights from "@/components/Highlights";
import TextCallout from "@/components/TextCallout";
import TypeFoundries from "@/components/TypeFoundries";

export default function FontsGallery() {

	const title = 'Fonts Gallery'
	const text = <p>Explore the dynamic interplay between typefaces and real-world design. Our archive shines a spotlight on the nuances and bold choices in typography today. As we progressively expand our archive, we`&apos;`re keenly focused on highlighting font foundries and the innovative ways their typefaces feature in design projects.</p>

	return (
		<>
			<section className="py-48 space-y-40">
				<TextCallout title={title} text={text} />
                <Highlights />
				<FontsGalleryGrid />
				<TypeFoundries />
			</section>
		</>
	);
}
