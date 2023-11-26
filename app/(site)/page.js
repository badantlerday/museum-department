import BecomeASupporter from "@/components/BecomeASupporter";
import FontsInUse from "@/components/FontsInUse";
import Header from "@/components/Header";
import LatestProjects from "@/components/LatestProjects";
import LatestStudios from "@/components/LatestStudios";
import Manifest from "@/components/Manifest";
import OnDisplay from "@/components/OnDisplay";
import SponsorTakeover from "@/components/SponsorTakeover";
import TextCallout from "@/components/TextCallout";

// import { client } from "../sanity/lib/client";
// import { motion } from "framer-motion";

export default function Home() {
	// const posts = await client.fetch(`*[_type == "project"]`);

	const titleSell = "Sell with us";
	const textSell = (
		<p>
			Were inviting creators to showcase their digital goods—mockups, typefaces,
			framer portfolio templates—in our Shop / Type Foundry. Join us and reach a
			dedicated audience passionate about design.
		</p>
	);

	const titleExplore = "Explore";

	return (
		<>
			{/* <SponsorTakeover /> */}
			<section className=" pt-48">
				<Manifest />
			</section>
			<section className="pt-40">
				<BecomeASupporter />
			</section>
			<section className="pt-40">
				<OnDisplay />
			</section>
			<section className="pb-40">
				<TextCallout title={titleSell} text={textSell} key={titleSell} />
			</section>
			<section className="space-y-40">
				<LatestStudios />
				<FontsInUse />
				{/* <LatestProjects /> */}
				<TextCallout title={titleExplore} key={titleExplore} />
			</section>
			{/* <SponsorTakeover /> */}
		</>
	);
}
