// export const revalidate = 60;
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { fetchPlaylistData, getUserBookmarks} from "@/app/actions";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
// import TypefaceBy from "@/components/TypefaceBy";
import BookmarkButton from "@/components/BookmarkButton";
import GridListing from "@/components/GridListing";
import HoverListing from "@/components/HoverListing";
import StudioPlaylist from "@/components/StudioPlaylist";
import StudioInterview from "@/components/StudioInterview";

// import { Suspense } from "react";
const builder = imageUrlBuilder(client);

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({ params, searchParams }, parent) {
  const { slug } = params;
  const query = `*[_type == "foundry" && slug.current == $slug][0]{
		name,
	  }`;
  const foundry = await client.fetch(query, { slug });

  return {
    title: foundry.name,
  };
}

//  (SSG) prerendered as static HTML
export async function generateStaticParams() {
  const query = `*[_type == "foundry"]{slug}`;
  const foundries = await client.fetch(query, {
    next: { revalidate: 60 },
  });

  return foundries.map((item) => ({
    slug: item.slug.current,
  }));
}


export default async function Foundry({ params }) {
  // const { getUser } = getKindeServerSession();
	// const user = await getUser();
  const {user,userBookmarks} = await getUserBookmarks();
  const { slug } = params;
  const query = `*[_type == "foundry" && slug.current == $slug][0]{
		_id,
    _type,
		name,
		slug,
		size,
		founded,
		information,
		typeDesigners[]->{
		  _id,
  		name,
  		_type,
  		slug
		},
		mainImage{crop,hotspot,asset->},
		mainFontImage{asset->},
		location[]->{
			_id, name, country->{name,slug},slug
		  },
		studioSoundsPlaylist,
		interview->{
			_id,
			title,
			slug,
			posterImage{crop,hotspot,asset->},
		},
		staff[]{title,people[]->{_id,name,slug}},
		"typefaces": *[_type == "typeface" && references(^._id)] | order(name asc){
			_id,
      _type,
			slug,
			name,
      realaseYear,
      style,
      foundry->{
        _id,
          _type,
        name,
        slug,
        location[]->{
          _id,name,_type,slug,country->{name,slug,_type}
        },
      },
      posterImage{crop,hotspot,asset->},
      specimenPoster{crop,hotspot,asset->},
      mainImage{crop,hotspot,asset->},
		},
		"projects": *[_type == "project" && fontsInUse[]->foundry->_id match ^._id]{
			_id,
			slug,
			_type,
			title,
			name,
			posterImage{crop,hotspot,asset->},
			studio->{name,slug},
			fontsInUse[]->{name,_id,slug}
		},
		"foundries": *[_type == "foundry"] | order(_createdAt desc){
			_id,
			slug,
			_type,
			title,
			name,
			posterImage{crop,hotspot,asset->},
			mainImage{crop,hotspot,asset->},
			location[]->{
			_id, name, country->{name,slug},slug
		  },
		}
	  }`;
  const foundry = await client.fetch(query, { slug });

  let dataStudioSounds = null;

  if (foundry.studioSoundsPlaylist) {
    const playlistUrl = foundry.studioSoundsPlaylist;
    try {
      // Directly assign the result of fetchPlaylistData to dataStudioSounds
      dataStudioSounds = await fetchPlaylistData(playlistUrl);

      // Now dataStudioSounds contains the playlist data
      // console.log("Playlist Data:", dataStudioSounds);

      // Process dataStudioSounds or use it in your component
    } catch (error) {
      console.error("Failed to fetch playlist data:", error);
    }
  }

  function getColumnClasses(projectCount) {
    if (projectCount <= 3) {
      return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
    } else if (projectCount <= 5) {
      return "grid-cols-2 sm:grid-cols-4 lg:grid-cols-4"
    } else {
      return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
    }
  }

  return (
    <>
      <section className="px-20 mx-auto _py-36 text-center justify-center flex flex-col h-[600px] bg-slate-300_">
        {foundry?.mainFontImage ? (
          <Image
            src={builder.image(foundry.mainFontImage).url()}
            width={3000}
            height={900}
            // blurDataURL={foundry.mainFontImage.asset.metadata.lqip}
            // placeholder="blur"
            alt={foundry?.name}
            unoptimized
          />
        ) : (
          <h1 className="text-5xl font-black tracking-wide uppercase mb-1">
            {foundry?.name}
          </h1>
        )}
      </section>
      <section className="pb-36">
        <div className="px-6 md:px-20 grid grid-cols-12 gap-10 w-full">
          <div className="col-span-3">
            <div className="mb-4">
              <h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
                Bookmark Foundry
              </h2>
              <ul className=" space-y-2 font-mono text-sm">
                <li>
                  <BookmarkButton
                    documentId={foundry._id}
                    variant="icon"
                    message={`${foundry?.name}`}
                  />
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <h2 className=" text-xs uppercase tracking-wider font-medium mb-1">
                Type Foundry
              </h2>
              <ul className="space-y-1 font-mono text-xs text-md-grey-400">
                <li>
                  <Link
                    href="/"
                    className="text-md-grey-400 transition-colors hover:text-md-grey-600"
                  >
                    {foundry?.name}
                  </Link>
                </li>
              </ul>
            </div>
            {foundry.founded && (
              <div className="mb-4">
                <h2 className=" text-xs uppercase tracking-wider font-medium mb-1">
                  Founded
                </h2>
                <ul className=" space-y-1 font-mono text-xs text-md-grey-400">
                  <li>{foundry?.founded}</li>
                </ul>
              </div>
            )}
            {foundry.size && (
              <div className="mb-4">
                <h2 className=" text-xs uppercase tracking-wider font-medium mb-1">
                  Size
                </h2>
                <ul className=" space-y-1 font-mono text-xs text-md-grey-400">
                  <li>{foundry?.size}</li>
                </ul>
              </div>
            )}
            <div className="mb-4">
              <h2 className=" text-xs uppercase tracking-wider font-medium mb-1">
                Location
              </h2>
              <ul className=" space-y-1 font-mono text-xs text-md-grey-400">
                {foundry.location?.map((item, index) => (
                  <li key={item._id} className="flex flex-col">
                    <Link
                      href={`/reference/${item?.slug.current}`}
                      className="text-md-grey-400 transition-colors hover:text-md-grey-600"
                    >
                      {item?.name}
                    </Link>
                    <Link
                      href={`/reference/${item?.country.slug.current}`}
                      className="text-md-grey-400 transition-colors hover:text-md-grey-600"
                    >
                      {item?.country.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {foundry.typeDesigners && (
              <div className="mb-4">
                <h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
                  Type Designers
                </h2>
                <ul className="space-y-1 font-mono text-xs text-md-grey-400">
                  {foundry.typeDesigners?.map((person, index) => (
                    <li key={person._id}>
                      <Link
                        href={`/reference/${person.slug.current}`}
                        className="text-md-grey-400 transition-colors hover:text-md-grey-600"
                      >
                        {person.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {foundry.website || foundry.instagram ? (
              <div className="mb-4">
                <h2 className=" text-xs uppercase tracking-wider font-medium mb-2">
                  Visit
                </h2>
                <ul className=" space-y-1 font-mono text-xs">
                  {foundry.website && (
                    <li>
                      <a
                        href={foundry.website}
                        target="_blank"
                        className="text-md-grey-400 transition-colors hover:text-md-grey-600"
                      >
                        Website
                      </a>
                    </li>
                  )}
                  {foundry.instagram && (
                    <li>
                      <a
                        href={foundry.instagram}
                        target="_blank"
                        className="text-md-grey-400 transition-colors hover:text-md-grey-600"
                      >
                        Instagram
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            ) : null}

            {foundry.staff?.map((item, index) => (
              <div key={index} className="mb-4">
                <h2 className=" text-xs uppercase tracking-wide font-medium mb-2">
                  {item.title}
                </h2>
                <ul className=" space-y-1 font-mono text-sm">
                  {item.people?.map((person, index) => (
                    <li key={person._id}>
                      <Link
                        href={`/person/${person.slug.current}`}
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

          <div className="article mb-10 md:mb-0 col-span-6 text-xl font-medium">
            <PortableText value={foundry?.information} />
          </div>
          <div className="article mb-10 md:mb-0 col-start-10 col-span-3"></div>
        </div>
      </section>
      <GridListing
        title={`Fonts in use by ${foundry?.name}`}
        data={foundry?.projects}
        columns={getColumnClasses(foundry?.projects.length)}
      />
      {/* <FontsInUseBy name={foundry?.name} projects={foundry?.projects} /> */}
      <section className="my-40">
        {/* <TypefaceBy name={foundry?.name} typefaces={foundry?.typefaces} /> */}
        <HoverListing data={foundry?.typefaces} sectionHeader="Fonts" userBookmarks={userBookmarks} user={user} />
      </section>
      {foundry.interview && <StudioInterview data={foundry} />}
      {dataStudioSounds && (
        <StudioPlaylist
          data={dataStudioSounds}
          playlistUrl={foundry.studioSoundsPlaylist}
        />
      )}
      <GridListing
        title={`Explore other TYPE FOUNDRIES`}
        data={foundry?.foundries}
        limit={6}
      />
    </>
  );
}
