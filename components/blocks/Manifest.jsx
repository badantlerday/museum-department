"use client";
import { motion } from "framer-motion";
// import { useEffect } from "react";
// import { animate, inView } from "motion";
export default function Manifest() {
	// useEffect(() => {
	// 	let wrapper = document.querySelector(".motion-manifest-section");
	// 	if (wrapper) {
	// 		wrapper.style.opacity = "0";
	// 		wrapper.style.margin = "30px 0 0 0";
	// 	}
	// 	inView(
	// 		".motion-manifest-section",
	// 		(info) => {
	// 			animate(
	// 				info.target,
	// 				{ opacity: 1, margin: "0px 0px 0px 0px" },
	// 				{ delay: 0.3, duration: 0.75 }
	// 			);
	// 		},
	// 		{ amount: 0.25 }
	// 	);
	// }, []);

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.75,
				delay: 0,
				// bounce: 0.4,
				// type: "spring",
			}}
			viewport={{ once: true }}
			key="manifest"
			className="py-20"
		>
			{/* <div className="motion-manifest-section" key="manifest"> */}
			<div className=" article font-medium px-4 lg:px-0 text-xl lg:text-2xl max-w-2xl mx-auto tracking-[0.5%] text-[#AAAAAA]">
				<p>MANIFESTO</p>
				<p>
					MUSEUM DEPARTMENT <br />
					Curating Contemporary Culture
				</p>

				<p>
					In a world saturated with fleeting impressions and transient
					aesthetics, Museum Department emerges as a beacon for enduring design.
					Our commitment extends beyond mere showcasing—it`&apos;`s about
					archiving, crediting, and interlinking contemporary works and people.
					On our platform, every piece becomes a focal point, connecting to
					fonts, studios, design narratives, and the people behind them. While
					we celebrate the present, our goal is to create a comprehensive
					archive of contemporary design work. To further the vision of Museum
					Department, we invite you to join us as a supporter. We offer two
					distinct tiers. By embracing the `&apos;`Patron`&apos;` tier, you not
					only support our cause but also gain access to our design community,
					Museum Department Society, hosted on our Discord channel.
				</p>

				<p>
					Delve into categories, probe free text, or trace individuals, and
					navigate the rich network of connections and narratives that our
					platform offers.
				</p>
			</div>
			{/* </div> */}
		</motion.div>
	);
}
