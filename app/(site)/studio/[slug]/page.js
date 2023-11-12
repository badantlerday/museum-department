import { client } from "../../../../sanity/lib/client";
import Link from "next/link";

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({ params, searchParams }, parent) {
	const { slug } = params;
	const query = `*[_type == "studio" && slug.current == $slug][0]{
		name,
	  }`;
	const studio = await client.fetch(query, { slug });

	return {
		title: studio.title,
	};
}

export default async function Studio({ params }) {
	const { slug } = params;
	const query = `*[_type == "studio" && slug.current == $slug][0]{
			_id,
            name,
            slug,
			location[]->{
				_id, name, country->{name}
			  }
	  }`;
	const studio = await client.fetch(query, { slug }); // Provide the value for $slug

	return (
		<>
			<section className="px-20 mx-auto mt-20">
				<div className=" aspect-video bg-slate-200"></div>
			</section>

			<section className="px-20 mx-auto _py-36 text-center justify-center flex flex-col h-[600px] bg-slate-300_">
				<h1 className="text-[28px] tracking-wide uppercase mb-1">
					{studio?.name}
				</h1>
				<p className="font-serif light text-3xl">
					from{" "}
					<span className="underline decoration-slate-300 underline-offset-[6px] hover:decoration-slate-600 transition-colors">
						{studio.location[0].name}
					</span>
					,{" "}
					<span className="underline decoration-slate-300 underline-offset-[6px] hover:decoration-slate-600 transition-colors">
						{studio.location[0].country.name}
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
					</div>
				</div>
			</section>
		</>
	);
}
