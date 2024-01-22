import AnimatedLink from "@/components/AnimatedLink";
import BecomeASupporter from "@/components/BecomeASupporter";
import TextCallout from "@/components/TextCallout";

export default function Submit() {
	const title = "Submit a project";
	const text = (
		<p>
			In a world saturated with fleeting impressions and transient aesthetics,
			Museum Department emerges as a beacon for enduring design. Our commitment
			extends beyond mere showcasing—its about archiving, crediting, and
			interlinking contemporary works and people.
		</p>
	);

	return (
		<>
			<section className="py-48 space-y-40">
				<TextCallout title={title} text={text} />
				<div className="article font-medium max-w-2xl mx-auto">
					
					<p>
						Fonts Gallery is a curated collection of typefaces from foundries
						around the world. Our mission is to showcase the best typefaces from
						the best typographers and designers in the world.
					</p>
					
				</div>
				<BecomeASupporter />
			</section>
		</>
	);
}
