// import { client } from "../../../../sanity/lib/client";
import { client } from "@/lib/sanity.client";
import { sanityFetch } from "@/lib/sanity.fetch";
import * as queries from "@/lib/sanity.queries";
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { format } from 'date-fns';
import Blocks from "@/components/Blocks"
import BookmarkButton from "@/components/BookmarkButton";
import VideoCloudinary from "@/components/VideoCloudinary";

const builder = imageUrlBuilder(client);

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({ params, searchParams }, parent) {
  const query = `*[_type == "project" && slug.current == $slug][0]{
		title,
	  }`;
  const project = await sanityFetch({ query, params, tags: ["project"] });

  return {
    title: project.title,
  };
}
//  (SSG) prerendered as static HTML
export async function generateStaticParams() {
  const query = `*[_type == "project" ]`
  const projects = await client.fetch(query);
 
  return projects.map((project) => ({
    slug: project.slug.current,
  }))
}

export default async function Page({ params }) {
  const query = `*[_type == "project" && slug.current == $slug][0]{
    _id,
		title,
		slug,
		information,
    publishedAt,
    pageBlocks,
    category[]->,
    mainImage{
      ${queries.imageMeta}
    },
    mainVideo,
		fontsInUse[]->{
			name,
			slug,
			foundry->{
				name,
				slug
			}
		},
		gallery{
			images[]{
				_key,
				display,
				asset->
			}
		},
    content[]{
      image[]{
        _key,
				asset->
      }
    },
		studio->{
			_id, name, slug,
			location[]->{
				_id, name, country->{name,slug},slug
			  }
		},
		credits[]{category->{title},title,people[]->{_id,name,slug}},
	  }`;
  const project = await sanityFetch({ query, params, tags: ["project"] });
  const publishedAt = format(new Date(project.publishedAt), 'd MMMM yyyy');
  // console.log(project.credits);


    const layoutSplit = "col-span-12";
    const getImageClasses = (size) => {
      switch (size) {
        case 'xl':
          return 'col-span-24';
        case 'lg':
          return 'col-start-3 col-span-20';
        case 'md':
          return 'col-start-7 col-span-12';
        case 'sm':
          return 'col-start-6 col-span-14';
        default:
          return 'col-start-3 col-span-20'; // Default to xl if size is not recognized
      }
    };
    const imageClasses = project?.mainImage?.size ? getImageClasses(project.mainImage.size) : 'col-start-3 col-span-20';


    // Hero
    let dominantColor = "#FAFBF7";
    if (project.mainImage?.dominant) {
      dominantColor = project.mainImage?.dominant;
    }
    const dominantBgStyle = {
      backgroundColor: dominantColor,
    };

  return (
    <>
    <section className="pt-20">
			<div className="mx-auto px-18">
				<div className="grid grid-cols-24 gap-4">
            {project?.mainImage && !project?.mainVideo &&
            <div className={`animate-in fade-in duration-1000 ${imageClasses} mb-2 aspect-video`} style={dominantBgStyle}>
                <Image
                  className=""
                  src={builder.image(project.mainImage).width(1500).quality(100).url()}
                  width={1500}
                  height={1500}
                  blurDataURL={project.mainImage.lqip}
								  placeholder="blur"
                  alt={project.mainImage?.alt || ""}
                />
            </div>
            }
            {project?.mainVideo &&
            <div className={`mb-2 col-span-24`}>
                    <VideoCloudinary
                    data={project.mainVideo}
                    transformation="video-project"
                    autoPlay={true}
                    blockref={project._id}
                    />
            </div>
            }
				</div>
			</div>
		</section>
    <section className="mx-auto px-16 ">
    <h1 className="text-center text-[56px] leading-[85%] text-md-black font-black mx-auto flex flex-col my-20 uppercase tracking-[-1%] px-28">
          <span>{project?.title}</span><span>by <Link
            href={`/studio/${project.studio.slug.current}`}
            className="transition-colors hover:text-md-grey-500"
          >
            {project.studio.name}
          </Link>{" "}
          </span><span>from <Link
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
      <h2 className=" mb-1 text-xs font-medium uppercase tracking-wide">Bookmark Project</h2>
      <ul className=" space-y-1 font-mono text-xs mb-4">               
        <li><BookmarkButton documentId={project._id} variant="icon" /></li>
        </ul>
      <h2 className=" mb-1 text-xs font-medium uppercase tracking-wide">Published</h2>
        <ul className=" space-y-2 font-mono text-xs mb-4">               
        <li>{publishedAt}</li>
        </ul>

      <h2 className=" mb-1 text-xs font-medium uppercase tracking-wide">Design Studio</h2>
      <ul className=" space-y-1 font-mono text-xs mb-4">               
        {/* <li>{project.studio.name}</li> */}
        <li><Link href={`/studio/${project.studio.slug.current}`} className="underline decoration-slate-300 underline-offset-[6px] transition-colors hover:decoration-slate-600">{project.studio.name}</Link></li>
        
        </ul>
      <h2 className=" mb-1 text-xs font-medium uppercase tracking-wide">Categories</h2>
      <ul className=" space-y-1 font-mono text-xs mb-4">
                {project.category?.map((cat, index) => (
                  <li key={index}>
                      <Link href={`/reference/${cat.slug.current}`} className="underline decoration-slate-300 underline-offset-[6px] transition-colors hover:decoration-slate-600">{cat.title}</Link>
                  </li>
                ))}
              </ul>
        <h2 className=" mb-1 text-xs font-medium uppercase tracking-wide">Fonts in use</h2>
              <ul className=" space-y-2 font-mono text-xs">
                {project.fontsInUse?.map((font, index) => (
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
                ))}
              </ul>
      </div>
      <div className=" col-span-4">
      {project.credits?.map((credit, index) => (
              <div key={index} className=" pb-5">
                <h2 className=" mb-1 text-xs font-medium uppercase tracking-wide">
                  {credit.category?.title}
                  {/* {credit.title} */}
                </h2>
                <ul className=" space-y-1 font-mono text-xs mb-4">
                  {credit.people?.map((person, index) => (
                    <li key={person._id}>
                      <Link
                        href={`/reference/${person.slug.current}`}
                        className="underline decoration-slate-300 underline-offset-[6px] transition-colors hover:decoration-slate-600"
                      >
                        {person.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

      </div>
      <div className="article col-start-13 col-span-10 font-light tracking-[2%] leading-tight [&>p]:indent-8">
      <PortableText value={project?.information} />
      </div>
    </div>
    </div>
  </section>
  <section>
    <div className="grid grid-cols-24">
      <div className="col-start-3 col-span-20">

        <div className="px-18 mx-auto grid grid-cols-2 gap-y-20">
            {project?.pageBlocks ? <Blocks data={project?.pageBlocks} /> : null}
        </div>
        
      </div>
    </div>
  </section>
  {/* <section>
    <div className="mx-auto px-16 space-y-20">
      {project.content?.map((item, outerIndex) => (
        <div key={outerIndex} className={`grid ${item.image && item.image.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
          {item.image?.map((image, innerIndex) => (
            <div key={image._key}>
              <Image
                src={builder.image(image).width(2000).url()}
                width={2000}
                height={1500}
                blurDataURL={image.asset.metadata.lqip}
                placeholder="blur"
                alt="alt"
                
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  </section> */}

  {/* <section className="mx-auto px-16">
    <div className=" order-2 col-span-4 grid grid-cols-2 gap-4 md:order-none">
    {project.gallery?.images?.map((item, index) => (
              <Image
                key={item._key}
                className={` object-cover ${
                  item.display === "2col"
                    ? "col-span-2 aspect-[4/3]"
                    : "aspect-[3/4]"
                }`}
                src={builder.image(item).width(2000).url()}
                width={2000}
                height={1500}
                blurDataURL={item.asset.metadata.lqip}
                placeholder="blur"
                alt="alt"
              />
            ))}
    </div>
  </section> */}


    </>
  );
}
