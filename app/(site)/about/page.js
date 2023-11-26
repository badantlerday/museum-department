import AnimatedLink from "@/components/AnimatedLink";
import BecomeASupporter from "@/components/BecomeASupporter";
import TextCallout from "@/components/TextCallout";

export default function About() {
	const title = "About";
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
					<AnimatedLink text="Explore the archive" url="/archive" />
					<p>
						Fonts Gallery is a curated collection of typefaces from foundries
						around the world. Our mission is to showcase the best typefaces from
						the best typographers and designers in the world.
					</p>
					<p>
						Explore the dynamic interplay between typefaces and real-world
						design. Our archive shines a spotlight on the nuances and bold
						choices in typography today. As we progressively expand our archive,
						we`&apos;`re keenly focused on highlighting font foundries and the
						innovative ways their typefaces feature in design projects.
					</p>
					<h2 className="mt-16 mb-4 uppercase">Our mission</h2>
					<p>
						In a world saturated with fleeting impressions and transient
						aesthetics, Museum Department emerges as a beacon for enduring
						design. Our commitment extends beyond mere showcasing—its about
						archiving, crediting, and interlinking contemporary works and
						people.
					</p>
					<p>
						On our platform, every piece becomes a focal point, connecting to
						fonts, studios, design narratives, and the people behind them. While
						we celebrate the present, our goal is to create a comprehensive
						archive of contemporary design work.
					</p>
				</div>
				<BecomeASupporter />
			</section>
		</>
	);
}
