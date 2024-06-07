export const revalidate = 60;
import FontsGalleryGrid from "@/components/FontsGalleryGrid";
import HighlightsFonts from "@/components/HighlightsFonts";
import TextCallout from "@/components/TextCallout";
import {TypeFoundries, NewTypeFoundries} from "@/components/TypeFoundries";
import NewFonts from "@/components/NewFonts";

export default function FontsGallery() {

	const title = 'Fonts Gallery'
	const text = <p>Explore the dynamic interplay between typefaces and real-world design. Our archive shines a spotlight on the nuances and bold choices in typography today. As we progressively expand our archive, we`&apos;`re keenly focused on highlighting font foundries and the innovative ways their typefaces feature in design projects.</p>

	return (
		<>
		<NewFonts />
		<section className=" py-60">
			<div className="mx-auto px-16 text-2xl bg-md-grey-200 py-10 text-center">IN USE</div>
		</section>
		<NewTypeFoundries />
		{/* <FontsGalleryGrid />	 */}
		{/* <section className="pt-10">
			<TypeFoundries />	
		</section> */}
		<section className=" py-60">
			<TextCallout title={title} text={text} button={true} buttonLink="/" buttonText="SUBMIT A TYPE PROJECT" />
		</section>
		<section className=" py-60">
			<div className="mx-auto px-16 text-2xl bg-md-grey-200 py-10 text-center">Fonts and Foundries Archive</div>
		</section>
		
		
		{/* <HighlightsFonts /> */}
		</>
	);
}
