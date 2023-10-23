import Header from "../components/Header";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Footer from "../components/Footer";
import { groq } from "next-sanity";
import Studios from "../components/Studios";
import { client } from "../sanity/lib/client";
import Projects from "../components/Projects";
import FontsInUse from "../components/FontsInUse";
import OnDisplay from "../components/OnDisplay";

export const postsQuery = groq`*[_type == "studio" && defined(slug.current)]{
  _id, name, slug, location[]->{
	_id, name, country->{name}
  }
}`;
export const projectsQuery = groq`*[_type == "project" && defined(slug.current)]{
	_id, title, slug, studio->{name}
  }`;

export const fontsinuseQuery = groq`  *[_type == "project" && defined(fontsInUse)] {
	_id, title, slug, studio->{name}, fontsInUse[]->{name}
  }`;

export const getStaticProps = async () => {
	const studios = await client.fetch(postsQuery);
	const projects = await client.fetch(projectsQuery);
	const fontsinuse = await client.fetch(fontsinuseQuery);

	return { props: { studios, projects, fontsinuse } };
};

export default function Home({ studios, projects, fontsinuse }) {
	// console.log(studios);

	return (
		<>
			<Header />
			<main className="py-48 relative z-10 bg-white mb-40 _space-y-48">
				<section>
					<OnDisplay />
				</section>
				<section className=" py-28">
					<Studios studios={studios} />
				</section>
				<section className=" py-28">
					<FontsInUse fontsinuse={fontsinuse} />
				</section>
				<section className=" py-28">
					<Projects projects={projects} />
				</section>
			</main>
			<Footer />
		</>
	);
}
