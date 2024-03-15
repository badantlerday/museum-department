export const revalidate = 60;
import TextCallout from "@/components/TextCallout";
import { client } from "@/lib/sanity.client";
import Link from "next/link";
import StudioImageSlideshow from "@/components/StudioImageSlideshow";
import Counter from "@/components/Counter"
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import FeaturedStudiosHeroSlider from "@/components/FeaturedStudiosHeroSlider";
const builder = imageUrlBuilder(client);

export default async function Studios() {
	const studios = await client.fetch(`*[_type == "studio" ]{
        _id,
		_createdAt,
		name,
		slug,
		location[]->{
			_id, name, country->{name}
		},
		  mainImage{crop,hotspot,asset->},
		  posterImage{crop,hotspot,asset->},
		  "projects": *[_type == "project" && references(^._id)]{
			name,
			posterImage{crop,hotspot,asset->},
		},
      }`);

	  const recentlyUpdatedProjects = await client.fetch(`*[_type == "project" ] | order(_updatedAt desc){
        _id,
		title,
		slug,
		posterImage{crop,hotspot,asset->},
		studio->{
			_id,
			name,
			slug,
			location[]->{
				_id,
				name,
				country->{name}
			},
			"countProjects": count(*[_type == "project" && references(^._id)])
		},
      }`);


	  
	  function filterProjects(projects) {
		const studioMap = new Map();
		const uniqueProjects = [];
	
		projects.forEach(project => {
			const studioId = project.studio._id;
			if (!studioMap.has(studioId)) {
				studioMap.set(studioId, true);
				uniqueProjects.push(project);
			}
		});
	
		return uniqueProjects;
	}
	const uniqueProjects = filterProjects(recentlyUpdatedProjects);


	//   const recentlyUpdatedStudios = await client.fetch(`*[_type == "studio"]{
	// 	_id,
	// 	name,
	// 	slug,
	// 	location[]->{
	// 		_id,
	// 		name,
	// 		country->{name}
	// 	},
	// 	"countProjects": count(*[_type == "project" && references(^._id)]),
	// 	"latestProject": *[_type == "project" && references(^._id)] | order(_updatedAt desc) [0]{
	// 		_id,
	// 		title,
	// 		slug,
	// 		posterImage{crop,hotspot,asset->}
	// 	}
	// }`);

	// Sort studios by '_createdAt' in descending order before mapping
	// const newStudios = [...studios];
	const newStudios = [...studios].sort((a, b) => new Date(b._createdAt) - new Date(a._createdAt));


	// Initialize Sets to store unique locations and countries
	const uniqueLocations = new Set();
	const uniqueCountries = new Set();

	// Iterate over the array of studios using destructuring and optional chaining
	studios.forEach(({ location }) => {
		location?.forEach(({ name, country }) => {
			uniqueLocations.add(name);
			if (country?.name) uniqueCountries.add(country.name);
		});
	});

	// The size of the Set is the count of unique elements
	const uniqueLocationCount = uniqueLocations.size;
	const uniqueCountryCount = uniqueCountries.size;

	const title = "Studios";
	const text = (
		<p>
			There’s <Counter number={studios.length} /> studios from <Counter number={uniqueLocationCount} /> different
			cities and <Counter number={uniqueCountryCount} /> countries currently on Museum Department.
		</p>
	);

	return (
		<>
			<section className="p-20 h-screen mb-40">
				{/* <div className="px-10 lg:px-20 mx-auto"> */}
						<FeaturedStudiosHeroSlider data={studios} />
				{/* </div> */}
			</section>

			<section className="py-20 mb-40">
				<div className="px-10 lg:px-20 mx-auto">
				<h3 className=" text-2xl font-medium mb-4 ">New studios</h3>
				<div className="grid grid-cols-2 gap-x-4 ">
				{newStudios.slice(0, 2).map((item) => (
					<div key={`new-studio-${item._id}`}>
						<div className="w-full aspect-[4/3] bg-md-grey-200 mb-2 relative" >
							<div className="uppercase text-[8px] font-medium bg-white absolute top-4 left-4 py-1 px-2 tracking-wider">New studio</div>
						</div>
						<span className="text-xs font-medium tracking-wide block uppercase">
							{item.name} ({item.projects.length})
						</span>
						<span className="text-xs font-medium italic block">
								{item.location[0].name}, {item.location[0].country?.name}
						</span>
					</div>
				))}

				</div>
				</div>
			</section>

			<div className="px-10 lg:px-20 mx-auto mb-40 ">
				<div className="flex gap-10 border-t border-md-grey-200 pt-6">
				<h3 className=" text-2xl font-medium mb-4">Recently updated</h3>
				<h3 className=" text-2xl font-medium mb-4 text-md-grey-300">Shuffle</h3>
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
					{uniqueProjects.slice(0,18).map((item) => (
						<Link
							key={item._id}
							href={`/studio/${item.studio.slug.current}`}
							passHref
							className="relative group"
						>
							<div className="uppercase text-[8px] font-medium bg-white absolute top-4 left-4 py-1 px-2 tracking-wider opacity-0 group-hover:opacity-100">{item.title}</div>
							{item.posterImage || item.posterImage ? (
								
								<Image
								className="aspect-[3/4] mb-2 object-cover"
								src={builder
									.image(item.posterImage || item.posterImage)
									.width(1000)
									.url()}
								width={800}
								height={665}
								blurDataURL={
									(item.posterImage || item.posterImage).asset
										.metadata.lqip
								}
								placeholder="blur"
								alt={item.name}
							/>
								
							
	
							) : (
								<div className="w-full aspect-[3/4] bg-md-grey-200 mb-2"></div>
							)}
							<span className="text-xs font-medium tracking-wide block uppercase">
								{item.studio.name} ({item.studio.countProjects})
							</span>
							<span className="text-xs font-medium italic block">
							{item.studio.location[0].name}, {item.studio.location[0].country?.name}
							</span>
						</Link>
					))}
					{/* {studios.map((item) => (
						<Link
							key={item._id}
							href={`/studio/${item.slug.current}`}
							passHref
							className="py-1"
						>
							{item.projects && item.projects.length > 0 ? (
								<StudioImageSlideshow
									images={item.projects.map((p) => p.posterImage)}
									alt={item.name}
								/>
							) : (
								<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
							)}
							<span className="text-xs font-medium tracking-wide block uppercase">
								{item.name} ({item.projects.length})
							</span>
							<span className="text-xs font-medium italic block">
							{item.location[0].name}, {item.location[0].country?.name}
							</span>
						</Link>
					))} */}
					{/* {studios.map((item) => (
						<Link
							key={item._id}
							href={`/studio/${item.slug.current}`}
							passHref
							className="py-1"
						>
							{item.projects?.[0]?.posterImage || item.posterImage ? (
								<Image
									className="aspect-[3/4] mb-2 object-cover"
									src={builder
										.image(item.projects?.[0]?.posterImage || item.posterImage)
										.width(1000)
										.url()}
									width={800}
									height={665}
									blurDataURL={
										(item.projects?.[0]?.posterImage || item.posterImage).asset
											.metadata.lqip
									}
									placeholder="blur"
									alt={item.name}
								/>
							) : (
								<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
							)}
							<span className=" text-sm font-medium tracking-wide">
								{item.name}
							</span>
						</Link>
					))} */}
				</div>
			</div>
			<section className="py-48 space-y-40">
				<TextCallout title={title} text={text} />
			</section>
			<section className="py-20">
				<div className="px-10 lg:px-20 mx-auto">
			<table className="w-full">
				<thead>
					<tr className="font-mono">
						<th className="text-left font-normal text-sm uppercase pb-4">Id</th>
						<th className="text-left font-normal text-sm uppercase pb-4">
							Project
						</th>
						<th className="text-left font-normal text-sm uppercase pb-4">
							Made by
						</th>
						<th className="text-left font-normal text-sm uppercase pb-4">
							Category
						</th>
						<th className="text-left font-normal text-sm uppercase pb-4">
							Location
						</th>
						<th className="text-left font-normal text-sm uppercase pb-4">
							Year
						</th>
					</tr>
				</thead>
				<tbody>
					{studios?.map((item, index) => (
						<tr key={item._id}>
							<td className="py-1 font-mono text-sm uppercase text-[#999]">
								Md-00{index + 1}-CAT-00{index + 1}
							</td>
							<td>
								<Link
									href={`/project/${item.slug.current}`}
									className="font-medium hover:italic"
								>
									{item.title}
								</Link>
							</td>
							<td className="font-medium ">
								<Link
									href={`/studio/${item.studio?.slug.current}`}
									className="font-medium hover:italic"
								>
									{item.studio?.name}
								</Link>
							</td>

							<td className="text-sm text-[#999] font-mono">Category</td>
							<td className="text-sm text-[#999] font-mono">
								{/* {item.studio.location[0].name},{" "}
								{item.studio.location[0].country?.name} */}
							</td>
							<td className="text-sm text-[#999] font-mono">{item.year}</td>
						</tr>
					))}
				</tbody>
			</table>
			</div>
			</section>
		</>
	);
}
