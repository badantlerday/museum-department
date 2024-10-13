// export const revalidate = 60;
import { sanityFetch } from "@/sanity/lib/client";
import { getInterviews } from "@/sanity/lib/queries";
import { stegaClean } from "@sanity/client/stega";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Button from "@/components/Button";

export default async function Interviews() {
  const interviews = await sanityFetch({
    query: getInterviews
  });

  return (
    <section className="text-center">
      {interviews.map((interview) => {
        // const minutes = Math.ceil(interview.readTime);

        return (
          <section className="py-20 px-8 sm:px-0" key={interview._id}>
        <div className="mx-auto text-center mb-2">
            <h1 className="font-serif uppercase text-3xl">{interview.studio.name}</h1>
        </div>
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
                        src={urlFor(interview.posterImage).width(1000).url()}
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
        <div className="text-center mt-8">
            <Button href={`/interviews/${interview.slug.current}`}>
              Read the Interview
            </Button>
          </div>
    </section>
          // <div key={interview._id} className="px-18 mx-auto">
          //   <p className="text-xs font-mono text-md-grey-400 uppercase mb-2">
          //     {minutes} min read
          //   </p>
          //   <Link href={`/interviews/${interview.slug.current}`}>
          //     <div className="text-5xl font-serif font-light uppercase">
          //       {interview.title}
          //     </div>
          //   </Link>
          //   <div className="pt-4 font-serif font-light max-w-xl mx-auto">
          //     {interview.excerpt}
          //   </div>
          // </div>
        );
      })}
    </section>
  );
}
