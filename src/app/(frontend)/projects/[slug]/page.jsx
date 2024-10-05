// export const revalidate = 60
import { client, sanityFetch } from "@/sanity/lib/client";
import { stegaClean } from "@sanity/client/stega";
import { getProject } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { format } from "date-fns";
import Blocks from "@/components/Blocks";
import BookmarkButton from "@/components/BookmarkButton";
import VideoCloudinary from "@/components/VideoCloudinary";

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({ params, searchParams }, parent) {
  const query = `*[_type == "project" && slug.current == $slug][0]{
		title,
	  }`;
  const project = await sanityFetch(
    { query, params, tags: ["project"] },
    { next: { revalidate: 60 } },
  );

  return {
    title: project.title,
  };
}
//  (SSG) prerendered as static HTML
export async function generateStaticParams() {
  const query = `*[_type == "project" ]{slug}`;
  const projects = await client.fetch(query, { next: { revalidate: 60 } });

  return projects.map((project) => ({
    slug: project.slug.current,
  }));
}

export default async function Page({ params }) {
  const { slug } = params;
  const project = await sanityFetch({
    query: getProject,
    params: { slug },
    tags: ["project"],
  });
  // console.log(project);

  if (!project) {
    // Handle missing project
    return <div>Project not found</div>;
  }
  // const title = project?.title || 'Default Title';
  const publishedAt = project?.publishedAt
    ? format(new Date(project.publishedAt), "d MMMM yyyy")
    : "Unknown";
  // const publishedAt = format(new Date(project.publishedAt), 'd MMMM yyyy');
  const uniqueFoundries = Array.from(
    new Set(project.fontsInUse?.map((font) => font.foundry.name)),
  ).map(
    (foundryName) =>
      project.fontsInUse?.find((font) => font.foundry.name === foundryName)
        .foundry,
  );
  // console.log(project.credits);

  const layoutSplit = "col-span-12";
  const getImageClasses = (size) => {
    switch (size) {
      case "xl":
        return "col-span-24";
      case "lg":
        return "col-start-3 col-span-20";
      case "md":
        return "col-start-7 col-span-12";
      case "sm":
        return "col-start-6 col-span-14";
      default:
        return "col-start-3 col-span-20"; // Default to xl if size is not recognized
    }
  };
  // const imageClasses = project?.mainImage?.size ? getImageClasses(project.mainImage.size) : 'col-start-3 col-span-20';
  const imageClasses = stegaClean(project?.sizeMedia)
    ? getImageClasses(stegaClean(project.sizeMedia))
    : "col-start-3 col-span-20";

  // Hero
  let dominantColor = "#FAFBF7";
  if (project.mainImage?.dominant) {
    dominantColor = stegaClean(project.mainImage?.dominant);
  }
  const dominantBgStyle = {
    backgroundColor: dominantColor,
  };

  return (
    <>
      <section className="pt-20">
        <div className="mx-auto px-18">
          <div className="grid grid-cols-24 gap-4">
            {project?.mainImage && !project?.mainVideo && (
              // <div className={`animate-in fade-in duration-1000 ${imageClasses} mb-2`} style={dominantBgStyle}>
              <div
                className={`animate-in fade-in duration-1000 ${imageClasses} mb-2`}
              >
                <Image
                  src={urlFor(project.mainImage).width(1500).url()}
                  width={1500}
                  height={2000}
                  blurDataURL={project.mainImage.lqip}
                  placeholder="blur"
                  alt={project.mainImage?.alt || ""}
                />
              </div>
            )}
            {project?.mainVideo && (
              <div
                className={`animate-in fade-in duration-1000 ${imageClasses} mb-2 _aspect-video bg-slate-300`}
                style={dominantBgStyle}
              >
                <VideoCloudinary
                  data={project.mainVideo}
                  transformation="video-project"
                  autoPlay={true}
                  blockref={project._id}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="mx-auto px-16 ">
        <h1 className="text-center text-[56px] leading-[85%] text-md-black font-black mx-auto flex flex-col my-20 uppercase tracking-[-1%] px-28">
          <span>{project?.title}</span>
          <span>
            by{" "}
            <Link
              href={`/studios/${project.studio.slug.current}`}
              className="transition-colors hover:text-md-grey-500"
            >
              {project.studio.name}
            </Link>{" "}
          </span>
          <span>
            from{" "}
            <Link
              href={`/reference/${project.studio.location[0].slug.current}`}
              className="transition-colors hover:text-md-grey-500"
            >
              {project.studio.location[0].name}
            </Link>
            {/* ,{" "}
          <Link
            href={`/country/${project.studio.location[0].country.slug.current}`}
            className="transition-colors hover:text-md-grey-300"
          >
            {project.studio.location[0].country.name}
          </Link> */}
          </span>
        </h1>
      </section>

      <section className="mb-40">
        <div className="px-10 lg:px-20 mx-auto">
          <div className="grid grid-cols-24 gap-4">
            <div className="col-start-3 col-span-4">
              <h2 className=" mb-1 text-xs font-medium uppercase tracking-wider">
                Bookmark Project
              </h2>
              <ul className=" space-y-1 font-mono text-xs mb-4">
                <li>
                  <BookmarkButton documentId={project._id} variant="icon" />
                </li>
              </ul>
              {publishedAt && (
                <>
                  <h2 className=" mb-1 text-xs font-medium uppercase tracking-wider">
                    Published
                  </h2>
                  <ul className=" space-y-2 font-mono text-xs mb-4">
                    <li className="text-md-grey-400">{publishedAt}</li>
                  </ul>
                </>
              )}

              <h2 className=" mb-1 text-xs font-medium uppercase tracking-wider">
                Design Studio
              </h2>
              <ul className=" space-y-1 font-mono text-xs mb-4">
                {/* <li>{project.studio.name}</li> */}
                <li>
                  <Link
                    href={`/studios/${project.studio.slug.current}`}
                    className="text-md-grey-400 transition-colors hover:text-md-grey-600"
                  >
                    {project.studio.name}
                  </Link>
                </li>
              </ul>
              {project.category && (
                <>
                  <h2 className=" mb-1 text-xs font-medium uppercase tracking-wider">
                    Categories
                  </h2>
                  <ul className=" space-y-1 font-mono text-xs mb-4">
                    {project.category?.map((cat, index) => (
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
                </>
              )}
              {project.fontsInUse && (
                <>
                  <h2 className=" mb-1 text-xs font-medium uppercase tracking-wider">
                    Fonts in use
                  </h2>
                  <ul className="space-y-1 font-mono text-xs ">
                    {project.fontsInUse?.map((font, index) => (
                      <li key={index}>
                        <Link
                          href={`/font/${font.slug.current}`}
                          className="text-md-grey-400 transition-colors hover:text-md-grey-600"
                        >
                          {font.name}
                        </Link>
                      </li>
                    ))}
                    {/* {project.fontsInUse?.map((font, index) => (
                  <li key={index}>
                    <Link
                      href={`/font/${font.slug.current}`}
                      className="underline decoration-slate-300 underline-offset-[6px] transition-colors hover:decoration-slate-600"
                    >
                      {font.name}
                    </Link>{" "}
                    by{" "}
                    <Link
                      href={`/foundry/${font.foundry.slug.current}`}
                      className="underline decoration-slate-300 underline-offset-[6px] transition-colors hover:decoration-slate-600"
                    >
                      {font.foundry.name}
                    </Link>
                  </li>
                ))} */}
                  </ul>
                </>
              )}
              {uniqueFoundries.length > 0 && (
                <>
                  <h2 className=" mb-1 text-xs font-medium uppercase tracking-wider mt-4">
                    Fonts Foundries
                  </h2>
                  <ul className="space-y-1 font-mono text-xs ">
                    {uniqueFoundries?.map((foundry, index) => (
                      <li key={index}>
                        <Link
                          href={`/foundry/${foundry.slug.current}`}
                          className="text-md-grey-400 transition-colors hover:text-md-grey-600"
                        >
                          {foundry.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className=" col-span-4">
              {project.credits?.map((credit, index) => (
                <div key={index} className="">
                  <h2 className=" mb-1 text-xs font-medium uppercase tracking-wider">
                    {credit.category?.title}
                    {/* {credit.title} */}
                  </h2>
                  <ul className=" space-y-1 font-mono text-xs mb-4">
                    {credit.people?.map((person, index) => (
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
              ))}
            </div>
            <div className="article text-md-black col-start-13 col-span-10 font-light tracking-[2%] leading-[120%] text-xl [&>p:first-of-type]:indent-8">
              {/* <input type="checkbox" id="toggle" className="peer hidden" /> */}
              {/* <div className="max-h-[20em] overflow-hidden peer-checked:max-h-fit"> */}
              <PortableText value={project?.information} />
              {/* </div> */}
              {/* <label htmlFor="toggle" className="text-birger-red text-base md:text-lg font-serif cursor-pointer mt-2 inline-block _peer-checked:hidden">
              <span className="peer-checked:hidden">Visa mer</span>
            </label> */}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-24">
          <div className="col-start-3 col-span-20">
            <div className="px-18 mx-auto grid grid-cols-2 gap-y-10">
              {project?.pageBlocks ? (
                <Blocks data={project?.pageBlocks} />
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
