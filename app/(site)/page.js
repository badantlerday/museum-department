import BecomeASupporter from "@/components/BecomeASupporter";
import FontsInUse from "@/components/FontsInUse";
import Header from "@/components/Header";
import LatestProjects from "@/components/LatestProjects";
import LatestStudios from "@/components/LatestStudios";
import Manifest from "@/components/Manifest";
import OnDisplay from "@/components/OnDisplay";
import TextCallout from "@/components/TextCallout";

// import { client } from "../sanity/lib/client";
// import { motion } from "framer-motion";

export default function Home() {
	// const posts = await client.fetch(`*[_type == "project"]`);

	return (
		<>
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
				<TextCallout />
			</section>
			<section className="space-y-40 pb-40">
				<LatestStudios />
				<FontsInUse />
				<LatestProjects />
			</section>
		</>
	);
}
