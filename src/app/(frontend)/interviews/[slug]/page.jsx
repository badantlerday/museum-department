export const revalidate = 60
import { client,sanityFetch } from "@/sanity/lib/client";
import {stegaClean} from '@sanity/client/stega'
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import SectionHeader from "@/components/SectionHeader";
import Footnote from "@/components/blocks/Footnote";
import InterviewNotes from "@/components/InterviewNotes";
import ItemsRow from "@/components/ItemsRow";
import { getInterview,getInterviews } from "@/sanity/lib/queries";
import GridListing from "@/components/GridListing";

// Custom component for rendering images
const ImageBlock = ({ value }) => {
    if (!value?.asset?._ref) {
      return null;
    }
    return (
      <div className="py-10">
        <Image
          src={builder.image(value).width(800).height(600).url()}
          alt={value.alt || ' '}
          width={800}
          height={600}
          className="w-full h-auto"
        />
        {value.caption && (
          <figcaption className="font-mono text-xs mt-2 text-md-grey-500">{value.caption}</figcaption>
        )}
      </div>
    );
  };

// Define the components object to map the custom footnote annotation
const components = {
    marks: {
      footnote: Footnote
    },
    types: {
        image: ImageBlock
      }
  };

const builder = imageUrlBuilder(client);


// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({ params, searchParams }, parent) {
  const query = `*[_type == "interview" && slug.current == $slug][0]{
		title,
	  }`;
  const interview = await sanityFetch({ query, params, tags: ["interview"] });

  return {
    title: interview.title,
  };
}
//  (SSG) prerendered as static HTML
export async function generateStaticParams() {
  const query = `*[_type == "interview" ]`
  const interviews = await client.fetch(query);
 
  return interviews.map((interview) => ({
    slug: interview.slug.current,
  }))
}

export default async function Interview({ params }) {
//   const query = `*[_type == "interview" && slug.current == $slug][0]{
//     _id,
//     title,
//     slug,
//     body,
//     excerpt,
//     posterImage{crop,hotspot,asset->},
//     }`;
  const interview = await sanityFetch({ query: getInterview, params });
  const allInterviews = await sanityFetch({ query: getInterviews, tags: ["interview"] });
  const minutes = Math.ceil(interview.readTime)

// Filter out blocks with footnotes
const footnoteBlocks = interview.body.filter(block =>
    block._type === 'block' && block.markDefs && block.markDefs.some(mark => mark._type === 'footnote')
  );
  
//   const slides = [
//     { id: 1, color: 'bg-red-500' },
//     { id: 2, color: 'bg-green-500' },
//     { id: 3, color: 'bg-blue-500' }
//   ];

  return (
    <>
    <section className="py-20 px-8 sm:px-0">
        <div className="mx-auto text-center mb-2">
            {/* <p className="text-xs font-mono text-md-grey-400 uppercase mb-2">{minutes} min read</p> */}
            <h1 className="font-serif uppercase text-3xl">{interview.studio.name}</h1>
        </div>
        {/* <div className="max-w-xl mx-auto text-center font-serif">
            <p>{interview.excerpt}</p>
        </div> */}
        <div className="mx-auto flex items-center flex-col">
            <div>
              {interview.textCollageIntro?.map((row, index) => {
                const cleanedColStart = stegaClean(row.colStart)
                return (
                  <div className="md:text-2xl lg:text-[32px] font-serif lg:leading-tight" key={index}>
                    <div className={`md-textCollageAdd-${cleanedColStart} col-span-full`}>
                      {row.text}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
        <div className="grid grid-cols-24 place-content-center my-10">
            {/* <div className=" col-start-11 col-span-4">
                <div className="aspect-[3/4] relative bg-md-grey-200 h-full mx-auto"></div>
            </div> */}
            {interview.posterImage || interview.posterImage ? (
                    <div className="col-start-8 md:col-start-11 col-span-10 md:col-span-4">
                        {/* <div className="aspect-[3/4] relative bg-md-grey-200 h-full mx-auto"></div> */}
                        <Image
                        className="aspect-[3/4] mb-2 object-cover"
                        src={builder
                            .image(interview.posterImage || interview.posterImage)
                            .width(1000)
                            .url()}
                        width={800}
                        height={665}
                        blurDataURL={
                            (interview.posterImage || interview.posterImage).asset
                                .metadata.lqip
                        }
                        placeholder="blur"
                        alt={interview.name}
                    />
                    </div>								
							) : (
								<div className="grid grid-cols-24 mt-20">
                    <div className="col-start-10 col-span-6">
                        <div className="aspect-[3/4] relative bg-md-grey-200 h-full mx-auto"></div>
                    </div>
                </div>
							)}
        </div>
        <div className="px-18 text-center font-serif">
        {interview.excerpt}
        </div>
    </section>
  
    <section className="mx-auto h-screen flex items-center">
      <div className="mx-auto">
        {interview.textCollage.map((row, index) => {
          const cleanedColStart = stegaClean(row.colStart)
          return (
            <div className="md:text-2xl lg:text-[32px] font-serif lg:leading-tight" key={index}>
              <div className={`md-textCollageAdd-${cleanedColStart} col-span-full`}>
                {row.text}
              </div>
            </div>
          )
        })}
    </div>
  </section>
    {/* <section className="py-40 h-screen flex items-center">
        <div className="px-18 mx-auto grid grid-cols-24">
            <div className="col-start-5 col-span-16 text-3xl font-serif tracking-tight">
            {interview.excerpt}
            </div>
        </div>
    </section> */}
    <section className="pt-20">
        <div className="px-8 sm:px-18 mx-auto">
            <div className="sm:grid sm:grid-cols-24">
            <div className="hidden lg:block col-span-4 relative">
                <InterviewNotes data={footnoteBlocks} />
            </div>
            <div className="interviewContent col-start-1 sm:col-start-3 col-span-20 lg:col-start-5 lg:col-span-16 space-y-6 font-serif font-normal">
                <PortableText value={interview.body} components={components} />
                <div className="text-center">***</div>
            </div>
            </div>
        </div>
    </section>
    <section className="px-18 mt-40 mx-auto">
    <ItemsRow data={interview.studio?.projects} link={interview.studio?.slug.current} title={interview.studio?.name} />
    </section>
    <section className="mt-40">
    <GridListing data={allInterviews} title="More Interviews" columns="grid-cols-2 sm:grid-cols-4 lg:grid-cols-4" />
    </section>
    {/* <section className="py-40">
        <div className="px-18 mx-auto">
        <SectionHeader title="More Interviews" border={true} />
        <div className="grid grid-cols-4 gap-4">
            <div>
                <div className="bg-md-grey-100 aspect-[3/4]"></div>
                <div className="mt-2">
                    <h3 className="text-xs font-medium tracking-[0.0075rem] uppercase">
                        Name
                    </h3>
                    <span className="text-xs font-medium italic block">
                    Location
                    </span>
                </div>
            </div>
        </div>
        </div>
    </section> */}

    </>
  );
}
