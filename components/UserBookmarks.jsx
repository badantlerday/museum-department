
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { createClient } from "@supabase/supabase-js";
import { client } from "@/lib/sanity.client";
import GridListing from "@/components/GridListing";
import { getUserBookmarks } from "@/app/actions";

export default async function UserBookmarks({ params }) {
//   const { getUser, isAuthenticated } = getKindeServerSession();
//   const user = await getUser();
const { user, userBookmarks } = await getUserBookmarks();

  if (!user || !user.id) {
    // Updated check
    return <div>Please log in to view bookmarks.</div>;
  }

  // https://medium.com/creditas-tech/react-suspense-swr-skeleton-e1979e9f32f0

  // Get the user's bookmarks from supabase
//   const bookmarks = await getUserBookmarks();

  // Extracting just the IDs into a new array
  const documentIds = userBookmarks.data?.map((obj) => obj.document_id);

  // If there are no bookmarks, return early
  if (!documentIds || documentIds.length === 0) {
    return <div>No bookmarks yet.</div>;
  }

  // Fetch the documents from Sanity
  const bookmarkDocuments = await client.fetch(
    `
	{
		"all": *[_id in $documentIds] {
		_id,
		title,
		name,
		slug,
		_type,
		location[]->{
			_id,
			name,
		  slug,
			country->{name,slug}
		},
		mainImage{crop,hotspot,asset->},
		posterImage{crop,hotspot,asset->},
		},
		"studios": *[_type == "studio" && _id in $documentIds] {
		_id,
		name,
		slug,
		_type,
		location[]->{
			_id,
			name,
			slug,
			country->{name,slug}
		},
		posterImage{crop,hotspot,asset->}
		},
		"foundries": *[_type == "foundry" && _id in $documentIds] {
		_id,
		name,
		slug,
		_type,
		location[]->{
			_id,
			name,
			slug,
			country->{name,slug}
		},
		posterImage{crop,hotspot,asset->}
		},
		"fontsinuse": *[_type == "project" && _id in $documentIds && defined(fontsInUse)] {
		_id,
		title,
		slug,
		studio->{name,slug},
		fontsInUse[]->{name,_id},
		posterImage{crop,hotspot,asset->},
		},
		"projects": *[_type == "project" && _id in $documentIds] {
		_id,
		title,
		slug,
		_type,
		studio->{name,slug},
		posterImage{crop,hotspot,asset->}
		},
		"typefaces": *[_type == "typeface" && _id in $documentIds] {
		_id,
		name,
		slug,
		_type,
		posterImage{crop,hotspot,asset->},
		specimenPoster{crop,hotspot,asset->},
		foundry->{name,slug},
		}
	}`,
    { documentIds }, // Passing the array as a parameter
  );

  // Calculate the number of projects
  const projectCount = bookmarkDocuments.projects?.length;
  const studioCount = bookmarkDocuments.studios?.length;
  const foundryCount = bookmarkDocuments.foundries?.length;
  const fontsinuseCount = bookmarkDocuments.fontsinuse?.length;
  const fontsCount = bookmarkDocuments.typefaces?.length;

  // 	const [selectedCategory, setSelectedCategory] = useState('all');

  //   const categories = {
  //     all: bookmarkDocuments.all || [],
  //     studios: bookmarkDocuments.studios || [],
  //     foundries: bookmarkDocuments.foundries || [],
  //     fontsinuse: bookmarkDocuments.fontsinuse || [],
  //     projects: bookmarkDocuments.projects || [],
  //     typefaces: bookmarkDocuments.typefaces || [],
  //   };

  //   const categoryTitles = {
  //     all: "All Bookmarks",
  //     studios: `${bookmarkDocuments.studios.length} Design Studios`,
  //     foundries: `${bookmarkDocuments.foundries.length} Font Foundries`,
  //     fontsinuse: `${bookmarkDocuments.fontsinuse.length} Fonts Gallery`,
  //     projects: `${bookmarkDocuments.projects.length} Design Projects`,
  //     typefaces: `${bookmarkDocuments.typefaces.length} Fonts`,
  //   };

  return (
    <>
      <GridListing
        data={bookmarkDocuments.studios}
        title={`${studioCount} Studios`}
        limit={18}
      />
      <GridListing
        data={bookmarkDocuments.projects}
        title={`${projectCount} Projects`}
        limit={18}
      />
      <GridListing
        data={bookmarkDocuments.foundries}
        title={`${foundryCount} Type Foundries`}
        limit={18}
      />
      <GridListing
        data={bookmarkDocuments.typefaces}
        title={`${fontsCount} Fonts`}
        limit={18}
      />

      {/*
<SectionHeader title={`${projectCount} Design Projects`} border={false} />
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8 mb-20">
					{bookmarkDocuments.projects.map((item) => (
						<Link
							key={item._id}
							href={`/project/${item.slug.current}`}
							passHref
							className="relative group"
						>
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
							<div className="flex">
								<div className=" grow">
									<span className="text-xs font-medium tracking-wide block uppercase">
										{item.name}{item.title}
									</span>
									<span className="text-xs font-medium italic block">
                  						{item.studio.name}
									</span>
								</div>
								<div>
									<Image
										src="/icon-bookmark.svg"
										width={10}
										height={15}
										alt="Cover"
									/>
								</div>
							</div>
						</Link>
					))}

</div>

<SectionHeader title={`${studioCount} Design Studios`} border={true} />
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8 mb-20">
					{bookmarkDocuments.studios.map((item) => (
						<Link
							key={item._id}
							href={`/studio/${item.slug.current}`}
							passHref
							className="relative group"
						>
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
								<div className="w-full aspect-[3/4] bg-md-grey-100 mb-2"></div>
							)}
							<div className="flex">
								<div className=" grow">
									<span className="text-xs font-medium tracking-wide block uppercase">
										{item.name}{item.title}
									</span>
									<span className="text-xs font-medium italic block">
										{item.location[0].name}, {item.location[0].country?.name}
									</span>
								</div>
								<div>
									<Image
										src="/icon-bookmark.svg"
										width={10}
										height={15}
										alt="Cover"
									/>
								</div>
							</div>
						</Link>
					))}

				</div>

<SectionHeader title={`${foundryCount} Font Foundries`} border={true} />
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8 mb-20">
	{bookmarkDocuments.foundries?.map((item) => (
		<Link
			key={item._id}
			href={`/studio/${item.slug.current}`}
			passHref
			className="relative group"
		>
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
				<div className="w-full aspect-[3/4] bg-md-grey-100 mb-2"></div>
			)}
			<div className="flex">
				<div className=" grow">
					<span className="text-xs font-medium tracking-wide block uppercase">
						{item.name}{item.title}
					</span>
					<span className="text-xs font-medium italic block">
						{item._type}
					</span>
				</div>
				<div>
					<Image
						src="/icon-bookmark.svg"
						width={10}
						height={15}
						alt="Cover"
					/>
				</div>
			</div>
		</Link>
	))}
</div>

<SectionHeader title={`${fontsinuseCount} Fonts Gallery`} border={true} />
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8 mb-20">
					{bookmarkDocuments.fountsinuse?.map((item) => (
						<Link
							key={item._id}
							href={`/studio/${item.slug.current}`}
							passHref
							className="relative group"
						>
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
							<div className="flex">
								<div className=" grow">
									<span className="text-xs font-medium tracking-wide block uppercase">
										{item.name}{item.title}
									</span>
									<span className="text-xs font-medium italic block">
                  {item._type}
									</span>
								</div>
								<div>
									<Image
										src="/icon-bookmark.svg"
										width={10}
										height={15}
										alt="Cover"
									/>
								</div>
							</div>
						</Link>
					))}

				</div>

<SectionHeader title={`${fontsCount} Fonts`} border={true} />
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8 mb-20">
	{bookmarkDocuments.typefaces?.map((item) => (
		<Link
			key={item._id}
			href={`/studio/${item.slug.current}`}
			passHref
			className="relative group"
		>
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
				<div className="w-full aspect-[3/4] bg-md-grey-100 mb-2"></div>
			)}
			<div className="flex">
				<div className=" grow">
					<span className="text-xs font-medium tracking-wide block uppercase">
						{item.name}{item.title}
					</span>
					<span className="text-xs font-medium italic block">
						{item.foundry.name}
					</span>
				</div>
				<div>
					<Image
						src="/icon-bookmark.svg"
						width={10}
						height={15}
						alt="Cover"
					/>
				</div>
			</div>
		</Link>
	))}
	</div> */}
    </>
  );
}
