import { client, sanityFetch } from "@/sanity/lib/client";
import { getCurrentStudio } from "@/sanity/lib/queries";
import { fetchPlaylistData, getUserBookmarks } from "@/app/actions";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

import BookmarkButton from "@/components/BookmarkButton";
import Link from "next/link";
import GridListing from "@/components/GridListing";
import StudioPlaylist from "@/components/StudioPlaylist";
import StudioInterview from "@/components/StudioInterview";
// import ExploreMore from "@/components/ExploreMore";



// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({ params, searchParams }, parent) {
    const { slug } = params;
    const data  = await sanityFetch({ query: getCurrentStudio, params:{ slug }, tags: ["studio"] })
    // const data = await client.fetch(query, { slug });
  
    return {
      title: data.studio.name,
    };
  }
  
  //  (SSG) prerendered as static HTML
  export async function generateStaticParams() {
    const queryAllStudios = `*[_type == "studio"]{slug}`;
    const studios = await client.fetch(queryAllStudios, {
      next: { revalidate: 60 },
    });
    // const studios = await sanityFetch({ query: getStudioSlugs, tags: ["studio"] })
  
    return studios.map((studio) => ({
      slug: studio.slug.current,
    }));
  }

export default async function Studio({ params }) {
    // const {user,userBookmarks} = await getUserBookmarks();
    const { slug } = params;
    const { studio } = await sanityFetch({ query: getCurrentStudio,params:{ slug }, tags: ["studio","project"] })

  let dataStudioSounds = null;

  if (studio.studioSoundsPlaylist) {
    const playlistUrl = studio.studioSoundsPlaylist;
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

  return (
    <>
      <section className=" px-6 md:px-20 mx-auto mt-20 mb-10">
        {studio?.mainImage ? (
          <div className="aspect-video relative flex items-center">
            <h1 className=" text-7xl tracking-wide uppercase mb-1 z-20 mx-auto font-mono text-white max-w-xl text-center">
              {studio.name}
            </h1>
            <div className="absolute bottom-4 z-20 uppercase text-white text-center w-full font-mono text-md">
              A Design Studio from {studio.location[0].name},{" "}
              {studio.location[0].country.name}
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-md-black opacity-[0.15] z-10"></div>
            <Image
              className="aspect-video object-cover absolute z-0"
            //   src={builder.image(studio.mainImage).width(2400).url()}
              src={urlFor(studio.mainImage).width(2400).url()}
              width={2400}
              height={900}
              blurDataURL={studio.mainImage.asset.metadata.lqip}
              placeholder="blur"
              alt={studio?.name}
            />
          </div>
        ) : (
          <div className="aspect-video relative flex items-center bg-[#FAFBF7]">
            <h1 className=" text-7xl tracking-wide uppercase mb-1 z-20 mx-auto font-mono max-w-xl text-center">
              {studio.name}
            </h1>
            <div className="absolute bottom-4 z-20 uppercase  text-center w-full font-mono text-md">
              A Design Studio from {studio.location[0].name},{" "}
              {studio.location[0].country.name}
            </div>
          </div>
        )}
      </section>
      <section className="pb-36">
        <div className="px-6 md:px-20 grid grid-cols-12 gap-10 w-full">
          <div className="col-span-3">
            <div className="mb-4">
              <h2 className=" text-xs uppercase tracking-wider font-medium mb-1">
                Bookmark studio
              </h2>
              <ul className=" space-y-2 font-mono text-xs">
                <li>
                  <BookmarkButton
                    documentId={studio._id}
                    variant="icon"
                    message={`${studio?.name}`}
                  />
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <h2 className=" text-xs uppercase tracking-wider font-medium mb-1">
                Studio
              </h2>
              <ul className=" space-y-1 font-mono text-xs text-md-grey-400">
                <li>{studio.name}</li>
              </ul>
            </div>
            {studio.founded && (
              <div className="mb-4">
                <h2 className=" text-xs uppercase tracking-wider font-medium mb-1">
                  Founded
                </h2>
                <ul className=" space-y-1 font-mono text-xs text-md-grey-400">
                  <li>{studio.founded}</li>
                </ul>
              </div>
            )}
            {studio.size && (
              <div className="mb-4">
                <h2 className=" text-xs uppercase tracking-wider font-medium mb-1">
                  Size
                </h2>
                <ul className=" space-y-1 font-mono text-xs text-md-grey-400">
                  <li>{studio.size}</li>
                </ul>
              </div>
            )}
            <div className="mb-4">
              <h2 className=" text-xs uppercase tracking-wider font-medium mb-1">
                Location
              </h2>
              <ul className=" space-y-1 font-mono text-xs text-md-grey-400">
                {studio.location?.map((item, index) => (
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
            {studio.category && (
              <div className="mb-4">
                <h2 className=" text-xs uppercase tracking-wider font-medium mb-2">
                  Categories
                </h2>
                <ul className=" space-y-1 font-mono text-xs">
                  {studio.category?.map((cat, index) => (
                    <li key={index}>
                      <Link
                        href={`/reference/${cat.slug.current}`}
                        className="text-md-grey-400 transition-colors hover:text-md-grey-600"
                      >
                        {cat.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {studio.website || studio.instagram ? (
              <div className="mb-4">
                <h2 className=" text-xs uppercase tracking-wider font-medium mb-2">
                  Visit
                </h2>
                <ul className=" space-y-1 font-mono text-xs">
                  {studio.website && (
                    <li>
                      <a
                        href={studio.website}
                        target="_blank"
                        className="text-md-grey-400 transition-colors hover:text-md-grey-600"
                      >
                        Website
                      </a>
                    </li>
                  )}
                  {studio.instagram && (
                    <li>
                      <a
                        href={studio.instagram}
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
          </div>
          <div className="article mb-10 md:mb-0 col-span-6 text-xl font-medium">
            <PortableText value={studio.description} />
          </div>
        </div>
      </section>
      <GridListing
        data={studio.works}
        title="Featured Work"
        columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
      />
      {studio.interview && <StudioInterview data={studio} />}
      {dataStudioSounds && (
        <StudioPlaylist
          data={dataStudioSounds}
          playlistUrl={studio.studioSoundsPlaylist}
        />
      )}
      <section className="text-center">
        [EXPLORE MORE SECTION - TO BE IMPLEMENTED]
      </section>
      {/* <ExploreMore data={studio.exploreMore} /> */}
    </>
  );
}
