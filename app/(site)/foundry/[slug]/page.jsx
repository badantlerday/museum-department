export const revalidate = 60;
import { LaunchIcon } from "@sanity/icons";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import TypefaceBy from "@/components/TypefaceBy";
import FontsInUseBy from "@/components/FontsInUseBy";
import TextCallout from "@/components/TextCallout";
import BookmarkButton from "@/components/BookmarkButton";
import GridListing from "@/components/GridListing";
import StudioInterview from "@/components/StudioInterview";
import StudioSounds from "@/components/StudioSounds";
import { Suspense } from "react";
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
  const { slug } = params;
  const query = `*[_type == "foundry" && slug.current == $slug][0]{
		_id,
		name,
		slug,
		_type,
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
		"typefaces": *[_type == "typeface" && references(^._id)]{
			_id,
			slug,
			name,
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

  // console.log(foundry.typeDesigners);

  // const titleExplore = "Exploration Redefined";
  // const textExplore = (
  //   <>
  //     <p>
  //       At Museum Department, every element is intricately interwoven. Whether a
  //       studio, foundry, or individual is linked to a project, typeface,
  //       interview, or artifact, our sophisticated search mechanism ensures
  //       effortless discovery.
  //     </p>
  //     <p>
  //       Delve into categories, probe free text, or trace individuals, and
  //       navigate the rich network of connections and narratives that our
  //       platform offers.
  //     </p>
  //   </>
  // );

  return (
    <>
      <section className="px-20 mx-auto _py-36 text-center justify-center flex flex-col h-[600px] bg-slate-300_">
        {foundry?.mainFontImage ? (
          <Image
            className=""
            src={builder.image(foundry.mainFontImage).width(2400).url()}
            width={3000}
            height={900}
            blurDataURL={foundry.mainFontImage.asset.metadata.lqip}
            placeholder="blur"
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
        columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
      />
      {/* <FontsInUseBy name={foundry?.name} projects={foundry?.projects} /> */}
      <section className="mt-40">
        <TypefaceBy name={foundry?.name} typefaces={foundry?.typefaces} />
      </section>
      <GridListing
        title={`Explore other TYPE FOUNDRIES`}
        data={foundry?.foundries}
        limit={6}
      />
    </>
  );
}
