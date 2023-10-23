import { motion } from "framer-motion";
import Link from "next/link";
export default function Foundry({ foundry }) {
	// console.log(project);
	return (
		<>
			<motion.section
				className="px-20 mx-auto _py-36 text-center justify-center flex flex-col h-[600px] bg-slate-300_"
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.75,
					delay: 0,
					bounce: 0.4,
					// type: "spring",
				}}
				viewport={{ once: true }}
				key={`hero-${foundry.slug.current}`}
			>
				<h1 className="text-2xl">{foundry.name}</h1>
			</motion.section>

			<motion.section
				className="pb-36"
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.75,
					delay: 0.4,
					bounce: 0.4,
					// type: "spring",
				}}
				viewport={{ once: true }}
				key={`content-${foundry.slug.current}`}
			>
				<div className="px-6 md:px-20 grid grid-cols-12 gap-10 w-full">
					<div className="col-span-2">
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Type Foundry
							</h2>
							<ul className=" space-y-2 font-mono text-sm">
								<li>
									<Link
										href="/"
										className="underline decoration-slate-300 underline-offset-[6px] hover:decoration-slate-600 transition-colors"
									>
										{foundry.name}
									</Link>
								</li>
							</ul>
						</div>
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Founded
							</h2>
							<ul className=" space-y-2 font-mono text-sm">
								<li>2005</li>
							</ul>
						</div>
					</div>
					<div className="article mb-10 md:mb-0 col-span-6 text-xl font-serif">
						<p>
							Klim Type Foundry (Klim) was founded by Kris Sowersby in 2005 and
							is based in Te Whanganui-a-Tara/Wellington, Aotearoa/New Zealand.
							Klim's foundational ethos is “a thing well made”.
						</p>
						<p>
							Their typefaces combine historical knowledge with rigorous
							contemporary craft. They believe the alphabet is a concept made
							concrete through written and designed letterforms — the alphabet
							is not defined by a single typeface but expressed through all of
							them.
						</p>
						<p>
							Klim's retail catalogue features fonts suitable for a complete
							range of use, from small and functional to large and decorative.
							These can be licensed for use across physical and digital
							applications. Their 'in use' section showcases the many, varied
							examples of their fonts used by international brands,
							institutions, and businesses of all sizes.
						</p>
						<p>
							They have designed custom fonts for international clients such as
							The Financial Times, PayPal, and National Geographic. Their fonts
							are included in Apple’s operating system, from macOS Catalina
							10.15.4. Closer to home, they have created custom fonts for The
							Bank of New Zealand, Trade Me, and Tourism New Zealand.
						</p>
						<p>
							Their work has won numerous awards. Most recently, the Epicene
							Collection received a Gold Cube from the ADC and a Certificate of
							Typographic Excellence from the TDC.
						</p>
					</div>
					<div className="article mb-10 md:mb-0 col-start-10 col-span-3">
						<div>
							<div className=" aspect-[3/4] bg-slate-200"></div>
							<caption className="text-xs font-mono block text-left mt-2">
								Kris Sowersby
							</caption>
						</div>
					</div>
				</div>
			</motion.section>
		</>
	);
}
