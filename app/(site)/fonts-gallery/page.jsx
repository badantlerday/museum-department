export const revalidate = 60;
import FontsGalleryGrid from "@/components/FontsGalleryGrid";
import HighlightsFonts from "@/components/HighlightsFonts";
import TextCallout from "@/components/TextCallout";
import {TypeFoundries, NewTypeFoundries} from "@/components/TypeFoundries";

export default function FontsGallery() {

	const title = 'Fonts Gallery'
	const text = <p>Explore the dynamic interplay between typefaces and real-world design. Our archive shines a spotlight on the nuances and bold choices in typography today. As we progressively expand our archive, we`&apos;`re keenly focused on highlighting font foundries and the innovative ways their typefaces feature in design projects.</p>

	return (
		<>
		<NewTypeFoundries />
		
		<section className="pt-10">
			<TypeFoundries />	
		</section>
		<section className=" py-60">
			<TextCallout title={title} text={text} button={true} buttonLink="/" buttonText="SUBMIT A TYPE PROJECT" />
		</section>
		<section>
			<div className="mx-auto px-16 pb-48">
				<div className="grid grid-cols-24 gap-4">
				<h2 className="text-xl font-medium col-span-full col-start-3">New Fonts Gallery</h2>
					<div className="col-start-3 col-end-12">
						<div className="bg-md-grey-100 aspect-[3/4] mb-2"></div>
						<span className="text-xs font-medium tracking-wide block uppercase">
							Foundry
						</span>
						<span className="text-xs font-medium italic block">
								country and city
						</span>
					</div>
					<div className="bg-md-grey-100 col-start-14 col-end-23 aspect-[3/4]"></div>					
				</div>
			</div>
		</section>
		
		<section>
			<div className="mx-auto px-16 py-10">
				<div className="grid grid-cols-6 gap-4 gap-y-10">
					<div>
						<div className="bg-md-grey-100 aspect-[3/4]"></div>
						<span className="text-xs font-medium tracking-wide block uppercase">
								Typeface
						</span>
						<span className="text-xs font-medium italic block">
							Type / Foundry / Specimen
						</span>
					</div>			
					<div className="bg-md-grey-100 aspect-[3/4]"></div>
					<div className="bg-md-grey-100 aspect-[3/4]"></div>
					<div className="bg-md-grey-100 aspect-[3/4]"></div>
					<div className="bg-md-grey-100 aspect-[3/4]"></div>
					<div className="bg-md-grey-100 aspect-[3/4]"></div>
					<div className="bg-md-grey-100 aspect-[3/4]"></div>
					<div className="bg-md-grey-100 aspect-[3/4]"></div>
					<div className="bg-md-grey-100 aspect-[3/4]"></div>
					<div className="bg-md-grey-100 aspect-[3/4]"></div>
					<div className="bg-md-grey-100 aspect-[3/4]"></div>
					<div className="bg-md-grey-100 aspect-[3/4]"></div>
					<div className="bg-md-grey-100 aspect-[3/4]"></div>
				</div>
			</div>
		</section>
			{/* <section className="py-48 space-y-40">
                <HighlightsFonts />
				<FontsGalleryGrid />
				
			</section> */}
		</>
	);
}
