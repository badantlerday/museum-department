// export const revalidate = 60;
import { fetchPlaylistData, getUserBookmarks } from "@/app/actions";
import { client, sanityFetch } from "@/sanity/lib/client";
import { getFoundry } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import BookmarkButton from "@/components/BookmarkButton";
import GridListing from "@/components/GridListing";
import HoverListing from "@/components/HoverListing";
import StudioPlaylist from "@/components/StudioPlaylist";
import StudioInterview from "@/components/StudioInterview";

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
  const { user, userBookmarks } = await getUserBookmarks();
  const { slug } = params;
  const foundry = await sanityFetch({
    query: getFoundry,
    params: { slug },
    tags: ["foundry", "typeface"],
  });

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
      return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3";
    } else if (projectCount <= 5) {
      return "grid-cols-2 sm:grid-cols-4 lg:grid-cols-4";
    } else {
      return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6";
    }
  }

  return (
    <>
      <section className="px-20 mx-auto _py-36 text-center justify-center flex flex-col h-[600px] bg-slate-300_">
        {foundry?.mainFontImage ? (
          <Image
            src={urlFor(foundry.mainFontImage).url()}
            width={3000}
            height={900}
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
          <div className="col-span-3 pt-1">
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
        <HoverListing
          data={foundry?.typefaces}
          sectionHeader="Fonts"
          userBookmarks={userBookmarks}
          user={user}
        />
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
