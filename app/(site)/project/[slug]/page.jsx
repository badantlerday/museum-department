// import { client } from "../../../../sanity/lib/client";
import { client } from "@/lib/sanity.client";
import { sanityFetch } from "@/lib/sanity.fetch";
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { format } from 'date-fns';
import Blocks from "@/components/Blocks"
import BookmarkButton from "@/components/BookmarkButton";

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

export default async function Page({ params }) {
  const query = `*[_type == "project" && slug.current == $slug][0]{
    _id,
		title,
		slug,
		information,
    publishedAt,
    pageBlocks,
    category[]->,
    mainImage{crop,hotspot,asset->},
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


  return (
    <>
    <section className="pt-20">
			<div className="mx-auto px-18">
				<div className="grid grid-cols-24 gap-4">
						<div className="bg-slate-200 col-start-3 col-span-20 mb-2">
            {project?.mainImage &&
                <Image
                  className=""
                  src={builder.image(project.mainImage).width(1500).quality(100).url()}
                  width={1500}
                  height={1500}
                  alt={project.mainImage?.alt || ""}
                />
            }
            </div>
				</div>
			</div>
		</section>
    <section className="mx-auto px-16 ">
    <h1 className="text-center text-[56px]/[50px] font-black mx-auto flex flex-col my-20 uppercase tracking-tight px-28">
          <span>{project?.title}</span><span>
          <Link
            href={`/studio/${project.studio.slug.current}`}
            className="transition-colors hover:text-md-grey-300"
          >
            {project.studio.name}
          </Link>{" "}
          </span><span><Link
            href={`/city/${project.studio.location[0].slug.current}`}
            className="transition-colors hover:text-md-grey-300"
          >
            {project.studio.location[0].name}
          </Link>
          ,{" "}
          <Link
            href={`/country/${project.studio.location[0].country.slug.current}`}
            className="transition-colors hover:text-md-grey-300"
          >
            {project.studio.location[0].country.name}
          </Link>
          </span>
        </h1>
    </section>
      {/* <section className="mx-auto flex h-[600px] flex-col justify-center px-20 text-center text-2xl font-medium tracking-[0.0075]">
        <h1 className="mb-1 uppercase">{project?.title}</h1>
        <p className="">
          Designed by{" "}
          <Link
            href={`/studio/${project.studio.slug.current}`}
            className="underline decoration-slate-300 underline-offset-[6px] transition-colors hover:decoration-slate-600"
          >
            {project.studio.name}
          </Link>{" "}
          from{" "}
          <Link
            href={`/city/${project.studio.location[0].slug.current}`}
            className="underline decoration-slate-300 underline-offset-[6px] transition-colors hover:decoration-slate-600"
          >
            {project.studio.location[0].name}
          </Link>
          ,{" "}
          <Link
            href={`/country/${project.studio.location[0].country.slug.current}`}
            className="underline decoration-slate-300 underline-offset-[6px] transition-colors hover:decoration-slate-600"
          >
            {project.studio.location[0].country.name}
          </Link>
        </p>
      </section> */}
  <section className="mb-40">
    <div className="px-10 lg:px-20 mx-auto">
    <div className="grid grid-cols-24 gap-4">
      <div className="col-start-3 col-span-4">
      <h2 className=" mb-1 text-xs font-medium uppercase tracking-wide">Published</h2>
        <ul className=" space-y-2 font-mono text-xs mb-4">               
        <li>{publishedAt}</li>
        </ul>
      <h2 className=" mb-1 text-xs font-medium uppercase tracking-wide">Bookmark Project</h2>
      <ul className=" space-y-1 font-mono text-xs mb-4">               
        <li><BookmarkButton documentId={project._id} /></li>
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
                      {cat.title}
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
                        href={`/person/${person.slug.current}`}
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
      <div className="article col-start-13 col-span-10 font-medium ">
      <PortableText value={project?.information} />
      </div>
    </div>
    </div>
  </section>
  <section>
    <div className="px-18 mx-auto grid grid-cols-2 gap-y-20">
        {project?.pageBlocks ? <Blocks data={project?.pageBlocks} /> : null}
        {/* <div className=" pr-2">
          <img src="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fzr8y06dn%2Fproduction%2F4b6379baf6c91ad263f5e4fc9d9ac86016e55604-896x1192.jpg%3Fw%3D2000&w=3840&q=75" alt="" />
        </div>
        <div className="pl-2">
          <img src="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fzr8y06dn%2Fproduction%2F4b6379baf6c91ad263f5e4fc9d9ac86016e55604-896x1192.jpg%3Fw%3D2000&w=3840&q=75" alt="" />
        </div>
        <div className=" col-span-2 ">
          <img src="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fzr8y06dn%2Fproduction%2F4b6379baf6c91ad263f5e4fc9d9ac86016e55604-896x1192.jpg%3Fw%3D2000&w=3840&q=75" alt="" className="aspect-video object-cover" />
        </div>
        <div className="">
          <img src="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fzr8y06dn%2Fproduction%2F4b6379baf6c91ad263f5e4fc9d9ac86016e55604-896x1192.jpg%3Fw%3D2000&w=3840&q=75" alt="" />
        </div>
        <div className="">
          <img src="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fzr8y06dn%2Fproduction%2F4b6379baf6c91ad263f5e4fc9d9ac86016e55604-896x1192.jpg%3Fw%3D2000&w=3840&q=75" alt="" />
        </div>
        <div className="">
          <img src="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fzr8y06dn%2Fproduction%2F4b6379baf6c91ad263f5e4fc9d9ac86016e55604-896x1192.jpg%3Fw%3D2000&w=3840&q=75" alt="" />
        </div>
        <div></div>
        <div className="">
          <img src="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fzr8y06dn%2Fproduction%2F4b6379baf6c91ad263f5e4fc9d9ac86016e55604-896x1192.jpg%3Fw%3D2000&w=3840&q=75" alt="" />
        </div>
        <div className="">
          <img src="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fzr8y06dn%2Fproduction%2F4b6379baf6c91ad263f5e4fc9d9ac86016e55604-896x1192.jpg%3Fw%3D2000&w=3840&q=75" alt="" />
        </div> */}
    </div>
  </section>
  <section>
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
  </section>




  {/* <section className="mx-auto px-16">

        // <div key={index}>
      //   sds
      //   {console.log(item.image)}
      // </div>


              // <Image
              //   key={item._key}
              //   className=" object-cover aspect-[4/3]"
              //   src={builder.image(item.image.asset).width(2000).url()}
              //   width={2000}
              //   height={1500}
              //   blurDataURL={item.image.asset.metadata.lqip}
              //   placeholder="blur"
              //   alt="alt"
              // />

  <div className="grid grid-cols-24 gap-4">

    <div className=" bg-md-grey-300 aspect-[4/3] col-span-full my-10"></div>
    <div className=" bg-md-grey-300 aspect-[3/4] col-span-12 my-10"></div>
    <div className={`bg-md-grey-300 aspect-[3/4] my-10 ${layoutSplit}`}></div>
    
    <div className="bg-md-grey-100 col-start-3 col-end-12 aspect-[3/4] my-12"></div>
    <div className="bg-md-grey-100 col-start-14 col-end-23 aspect-[3/4] my-12"></div>

    <div className="bg-slate-200 col-start-5 col-span-16 aspect-[3/4]"></div>	

  </div>

  </section> */}

  <section className="mx-auto px-16">
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
 
  </section>


    </>
  );
}
