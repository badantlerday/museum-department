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

	const titleExplore = "Exploration Redefined";
	const textExplore = (
		<>
			<p>
				At Museum Department, every element is intricately interwoven. Whether a
				studio, foundry, or individual is linked to a project, typeface,
				interview, or artifact, our sophisticated search mechanism ensures
				effortless discovery.
			</p>
			<p>
				Delve into categories, probe free text, or trace individuals, and
				navigate the rich network of connections and narratives that our
				platform offers.
			</p>
		</>
	);

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
				<TextCallout
					title={titleSell}
					text={textSell}
					button={true}
					buttonText="Email us"
					buttonLink="mailto:collaboration@museumdepartment.com"
					key={titleSell}
				/>
			</section>
			<section className="space-y-40">
				<LatestStudios />
				<FontsInUse />
				{/* <LatestProjects /> */}
				<TextCallout
					title={titleExplore}
					text={textExplore}
					button={true}
					buttonText="Search"
					buttonLink="/search"
					key={titleExplore}
				/>
			</section>
			{/* <SponsorTakeover /> */}
		</>
	);
}
