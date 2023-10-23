import Header from "../components/Header";
import Link from "next/link";
import { groq } from "next-sanity";
import { client } from "../sanity/lib/client";
import Footer from "../components/Footer";

// const fontsInUseQuery = groq`*[_type == "project" && defined(fontsInUse)]{
//     _id, title, slug, studio->{name}, fontsInUse[]->{name}
//   }`;

// const foundriesQuery = groq`*[_type == "foundry"]{
//     _id, name, slug
//   }`;

// const typefacesQuery = groq`*[_type == "typeface"]{
//     _id, name, slug
//   }`;

const fontsinuseQuery = groq`
  {
    "projects": *[_type == "project" && defined(fontsInUse)] {
      _id, title, slug, studio->{name}, fontsInUse[]->{name}
    },
    "foundries": *[_type == "foundry"] {
      _id, name, slug
    },
    "typefaces": *[_type == "typeface"] {
      _id, name, slug
    }
  }
`;

export const getStaticProps = async () => {
	const data = await client.fetch(fontsinuseQuery);
	const projects = data.projects || [];
	const foundries = data.foundries || [];
	const typefaces = data.typefaces || [];

	// const projects = await client.fetch(fontsInUseQuery);
	// const foundries = await client.fetch(foundriesQuery);
	// const typefaces = await client.fetch(typefacesQuery);

	return { props: { projects, foundries, typefaces } };
};

export default function FontsInUse({ projects, foundries, typefaces }) {
	return (
		<>
			<Header />

			{/* <section className="px-20 py-36">
				<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
					Fonts
				</h2>
				<ul className="space-y-1 text-sm">
					{typefaces?.map((typeface, index) => (
						<li key={`font-${typeface._id}`}>
							<Link href={`typeface/${typeface.slug.current}`}>
								{typeface.name}
							</Link>
						</li>
					))}
				</ul>
			</section> */}
			<section className="px-20 py-36">
				<div className="grid grid-cols-6 gap-10">
					<div>
						<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
							Type Foundries
						</h2>
						<ul className="space-y-1 text-sm">
							{foundries?.map((foundry, index) => (
								<li key={foundry._id}>
									<Link href={`foundry/${foundry.slug.current}`}>
										{foundry.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 col-span-5">
						{projects?.map((project, index) => (
							<Link key={project._id} href={`project/${project.slug.current}`}>
								<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
								{project.fontsInUse?.map((typeface, index) => (
									<h3
										key={`fontinuse-${typeface._id}`}
										className="text-sm tracking-wide"
									>
										{typeface.name}
									</h3>
								))}
								<div className="font-mono font-light text-xs mt-1">
									<h2 className="font-mono">{project.title}</h2>
								</div>
							</Link>
						))}
						<Link href="/">
							<div className="w-full aspect-[3/4] bg-[#F5F5EE] mb-2 flex items-center text-xs">
								<div className=" max-w-[100px] mx-auto">
									SPONSOR SPOT AVAILABLE
								</div>
							</div>
							<h3 className="text-sm tracking-wide">
								Interested? Get in touch
							</h3>
						</Link>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
}
