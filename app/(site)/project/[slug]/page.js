import { client } from "../../../../sanity/lib/client";
import Link from "next/link";

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({ params, searchParams }, parent) {
	const { slug } = params;
	const query = `*[_type == "project" && slug.current == $slug][0]{
		title,
	  }`;
	const project = await client.fetch(query, { slug });

	return {
		title: project.title,
	};
}

export default async function Page({ params }) {
	const { slug } = params;
	const query = `*[_type == "project" && slug.current == $slug][0]{
		title,
		slug,
		fontsInUse[]->{
			name,
			slug,
			foundry->{
				name,
				slug
			}
		},
		studio->{
			_id, name, slug,
			location[]->{
				_id, name, country->{name}
			  }
		},
		credits[]{title,people[]->{_id,name}},
	  }`;
	const project = await client.fetch(query, { slug }); // Provide the value for $slug

	return (
		<>
			<section className="px-20 mx-auto _py-36 text-center justify-center flex flex-col h-[600px] bg-slate-300_">
				<h1 className="text-[28px] tracking-wide uppercase mb-1">
					{project?.title}
				</h1>
				<p className="font-serif light text-3xl">
					Designed by{" "}
					<Link
						href={`/studio/${project.studio.slug.current}`}
						className="underline decoration-slate-300 underline-offset-[6px] hover:decoration-slate-600 transition-colors"
					>
						{project.studio.name}
					</Link>{" "}
					from{" "}
					<span className="underline decoration-slate-300 underline-offset-[6px] hover:decoration-slate-600 transition-colors">
						{project.studio.location[0].name}
					</span>
					,{" "}
					<span className="underline decoration-slate-300 underline-offset-[6px] hover:decoration-slate-600 transition-colors">
						{project.studio.location[0].country.name}
					</span>
				</p>
			</section>
			<section className="pb-36">
				<div className="px-6 md:px-20 grid md:grid-cols-6 md:gap-10 items-start">
					<div className="col-span-4 space-y-4 order-2 md:order-none">
						<div className=" aspect-video bg-slate-200"></div>
						<div className=" aspect-video bg-slate-200"></div>
						<div className="grid grid-cols-2 gap-4">
							<div className=" aspect-[3/4] bg-slate-200"></div>
							<div className=" aspect-[3/4] bg-slate-200"></div>
						</div>

						<div className=" aspect-video bg-slate-200"></div>
						<div className=" aspect-video bg-slate-200"></div>
					</div>
					<div className="col-span-2 article order-1 md:order-none mb-10 md:mb-0 _md:sticky _md:top-24">
						<p>
							Established in 1985, Sundance Film Festival is the largest and
							longest-running independent film festival in the United States.
							They’ve fostered new voices and risk-taking films, debuting iconic
							titles of the indie canon: American Psycho to Love & Basketball,
							Call Me by Your Name to CODA, Little Miss Sunshine to Fair Play.
						</p>
						<p>
							Established in 1985, Sundance Film Festival is the largest and
							longest-running independent film festival in the United States.
							They’ve fostered new voices and risk-taking films, debuting iconic
							titles of the indie canon: American Psycho to Love & Basketball,
							Call Me by Your Name to CODA, Little Miss Sunshine to Fair Play.
						</p>

						<p>
							Established in 1985, Sundance Film Festival is the largest and
							longest-running independent film festival in the United States.
							They’ve fostered new voices and risk-taking films, debuting iconic
							titles of the indie canon: American Psycho to Love & Basketball,
							Call Me by Your Name to CODA, Little Miss Sunshine to Fair Play.
						</p>

						<div className=" py-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Fonts
							</h2>
							<ul className=" space-y-2 font-mono text-sm">
								{project.fontsInUse?.map((font, index) => (
									<li key={index}>
										<Link
											href={`/font/${font.slug.current}`}
											className="underline decoration-slate-300 underline-offset-[6px] hover:decoration-slate-600 transition-colors"
										>
											{font.name}
										</Link>{" "}
										by{" "}
										<Link
											href={`/foundry/${font.foundry.slug.current}`}
											className="underline decoration-slate-300 underline-offset-[6px] hover:decoration-slate-600 transition-colors"
										>
											{font.foundry.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
						{project.credits?.map((credit, index) => (
							<div key={index} className=" py-5">
								<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
									{credit.title}
								</h2>
								<ul className=" space-y-1 font-mono text-sm">
									{credit.people?.map((person, index) => (
										<li key={person._id}>
											<Link
												href="/"
												className="underline decoration-slate-300 underline-offset-[6px] hover:decoration-slate-600 transition-colors"
											>
												{person.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
