import { client } from "@/lib/sanity.client";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import TypefacesByFoundry from "@/components/TypefacesByFoundry";
import BookmarkButton from "@/components/BookmarkButton";
import { PortableText } from "@portabletext/react";
import GridListing from "@/components/GridListing";

const builder = imageUrlBuilder(client);

export default async function Foundry({ params }) {
	const { slug } = params;
	// First, you fetch the specific typeface by its slug (typeface_id)
	const typefaceQuery = `*[_type == "typeface" && slug.current == $slug][0]{
    _id,
    name,
    slug,
	style,
	realaseYear,
	fontUrl,
	information,
	specimenPoster{
		crop,
		hotspot,
		asset->
	},
    foundry->{
		_id,
        name,
        slug
    },
	"foundryTypfaces": *[_type in ["typeface"] && foundry->_id == ^.foundry->_id]{
		_id,
		name,
		slug,
	  },
  }`;
	const typeface = await client.fetch(typefaceQuery, { slug }); // Provide the value for $slug

	// Assuming typeface._id contains the ID of the typeface, you can now fetch projects that use this typeface
	const fontinuseQuery = `*[_type == "project" && defined(fontsInUse) && $typefaceId in fontsInUse[]->_id] {
    _id, 
    title, 
    slug,
	_type, 
    studio->{name,slug}, 
    fontsInUse[]->{name,_id,slug}
  }`;
	const fontinuse = await client.fetch(fontinuseQuery, {
		typefaceId: typeface._id,
	});

	return (
		<>
			<section className="px-20 mx-auto _py-36 text-center justify-center flex flex-col h-[600px] bg-slate-300_">
				<h1 className="text-5xl font-black tracking-wide uppercase mb-1">
					{typeface?.name}
				</h1>
			</section>
			<section className="pb-36">
				<div className="px-6 md:px-20 grid grid-cols-12 gap-10 w-full">
					<div className="col-span-3">
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Bookmark font
							</h2>
							<ul className=" space-y-2 font-mono text-sm">
								<li>
									<BookmarkButton
										documentId={typeface._id}
										variant="icon"
										message={`${typeface?.name}`}
									/>
								</li>
							</ul>
						</div>
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Font
							</h2>
							<ul className=" space-y-2 font-mono text-sm">
								<li>{typeface?.name}</li>
							</ul>
						</div>
						{typeface?.style && (
							<div className="mb-5">
								<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
									Style
								</h2>
								<ul className=" space-y-2 font-mono text-sm">
									<li>{typeface?.style}</li>
								</ul>
							</div>
						)}
						<div className="mb-5">
							<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
								Type Foundry
							</h2>
							<ul className=" space-y-2 font-mono text-sm">
								<li>
									<Link
										href={`/foundry/${typeface?.foundry.slug.current}`}
										className="underline decoration-slate-300 underline-offset-[6px] hover:decoration-slate-600 transition-colors"
									>
										{typeface?.foundry.name}
									</Link>
								</li>
							</ul>
						</div>
						{typeface?.realaseYear && (
							<div className="mb-5">
								<h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
									Release
								</h2>
								<ul className=" space-y-2 font-mono text-sm">
									<li>{typeface?.realaseYear}</li>
								</ul>
							</div>
						)}
						{typeface?.fontUrl && (
							<div className="mb-5">
								<h2 className="text-xs uppercase tracking-wide font-medium mb-2">
									Buy font
								</h2>
								<ul className="space-y-2 font-mono text-sm">
									<li>
										<a href={typeface.fontUrl.url} target="_blank">
											{typeface.fontUrl.label}
										</a>
									</li>
								</ul>
							</div>
						)}
					</div>
					<div className="article mb-10 md:mb-0 col-span-6 text-xl font-medium">
						<PortableText value={typeface?.information} />
					</div>
					<div className="article mb-10 md:mb-0 col-start-10 col-span-3">
						{/* <div>
							{typeface?.specimenPoster ? (
								<Image
									className="_aspect-[3/4] mb-2 object-contain"
									src={builder.image(typeface.specimenPoster).width(500).url()}
									width={500}
									height={500}
									blurDataURL={typeface.specimenPoster.asset.metadata.lqip}
									placeholder="blur"
									alt={typeface?.name}
								/>
							) : (
								<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
							)}
							<div className="text-xs font-mono block text-left mt-2">
								Specimen
							</div>
						</div> */}
					</div>
				</div>
			</section>
			<section>
				<GridListing
					title={`${typeface?.name || ""} in use`}
					data={fontinuse}
					columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
				/>
			</section>
			{/* <section>
				<div className="px-6 md:px-20 mx-auto">
					<div className="border-t border-[#E6E6E6] mb-4"></div>
					<div className="flex items-center">
						<div className="grow">
							<SectionHeader title={`${typeface.name} in use`} />
						</div>
						<ul className=" space-x-2 font-medium text-lg flex">
							<li>All</li>
							<li>Curated</li>
						</ul>
					</div>
				</div>
				<div className="px-20 mx-auto grid grid-cols-1 mt-4">
					<div className="grid grid-cols-4 gap-4">
						{fontinuse?.map((project, index) => (
							<Link key={project._id} href={`/project/${project.slug.current}`}>
								<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
								<div className="text-sm">
									<h3 className="font-medium tracking-[0.0075rem]">
										{project.title} by {project.studio.name}
									</h3>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section> */}
			{/* <TypefacesByFoundry
				name={`Fonts by ${typeface?.foundry.name.toUpperCase()}`}
				typefaces={typeface.foundryTypfaces}
			/> */}
		</>
	);
}
