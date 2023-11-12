import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../../../sanity/lib/client";
import Link from "next/link";
import StudioFeaturedWork from "@/components/StudioFeaturedWork";
import StudioInterview from "@/components/StudioInterview";

const builder = imageUrlBuilder(client);

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
			mainImage{crop,hotspot,asset->},
			location[]->{
				_id, name, country->{name}
			  }
	  }`;
	const studio = await client.fetch(query, { slug }); // Provide the value for $slug

	return (
		<>
			<section className="px-20 mx-auto my-20">
				{studio?.mainImage ? (
					<Image
						className="aspect-video mb-2 object-cover"
						src={builder.image(studio.mainImage).width(1500).url()}
						width={1500}
						height={900}
						blurDataURL={studio.mainImage.asset.metadata.lqip}
						placeholder="blur"
						alt={studio?.name}
					/>
				) : (
					<div className=" aspect-video bg-slate-200"></div>
				)}
			</section>
			{/* 
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
			</section> */}
			<section className="pb-36">
				<div className="px-6 md:px-20 grid grid-cols-12 gap-10 w-full">
					<div className="col-span-3">
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Classification
							</h2>
							<ul className=" space-y-2 font-mono text-sm">
								<li>-</li>
							</ul>
						</div>
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Style
							</h2>
							<ul className=" space-y-2 font-mono text-sm">
								<li>-</li>
							</ul>
						</div>
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Type Foundry
							</h2>
						</div>

						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Release Date
							</h2>
							<ul className=" space-y-2 font-mono text-sm">
								<li>-</li>
							</ul>
						</div>
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Designer
							</h2>
							<ul className=" space-y-2 font-mono text-sm">
								<li>-</li>
							</ul>
						</div>
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Font Engieneering
							</h2>
							<ul className=" space-y-2 font-mono text-sm">
								<li>-</li>
							</ul>
						</div>
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Buy
							</h2>
							<ul className=" space-y-2 font-mono text-sm">
								<li>-</li>
							</ul>
						</div>
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Bookmark
							</h2>
							<ul className=" space-y-2 font-mono text-sm">
								<li>-</li>
							</ul>
						</div>
					</div>
					<div className="article mb-10 md:mb-0 col-span-6 text-xl font-medium">
						<p>
							Laborum ut fugiat in et occaecat ad est est amet proident enim
							labore. Culpa tempor elit quis nisi sunt. Eu elit consequat sint
							elit culpa labore qui reprehenderit non sint proident dolore sint
							ea dolore. Qui est tempor veniam sit dolor sunt. Incididunt
							exercitation anim excepteur non. Eiusmod commodo velit ut elit
							elit ex pariatur duis. Ex enim ea eiusmod aliqua mollit deserunt
							amet ullamco commodo deserunt sint sunt elit ullamco cupidatat.
						</p>
						<p>
							Cillum deserunt irure ex officia amet. Reprehenderit tempor magna
							proident. Velit eiusmod ad esse ea est reprehenderit velit id
							magna. Eu sit eu do mollit culpa laborum tempor reprehenderit sunt
							laboris. Labore ut amet id veniam aute eiusmod in aliquip fugiat
							enim qui laboris nulla Lorem dolor. Velit mollit quis amet eu
							aliquip dolore aliqua.
						</p>
					</div>
					<div className="article mb-10 md:mb-0 col-start-10 col-span-3">
						<div>
							<div className="text-xs font-mono block text-left mt-2">
								Specimen
							</div>
						</div>
					</div>
				</div>
			</section>
			<StudioFeaturedWork />
			<StudioInterview />
		</>
	);
}
