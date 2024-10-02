import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";

const builder = imageUrlBuilder(client);

export default function StudioInterview({ data }) {
  const { interview, name, location } = data || {};
  // console.log(interview);
  return (
    <section className="pb-36">
      <div className="px-20 mx-auto">
        <div className=" h-[850px] bg-[#FAFBF7] flex flex-col py-6">
          <div className="text-center font-mono text-6xl uppercase">
            {name}
            <br />
            {location[0].name}
          </div>
          <div className="flex-auto items-center flex">
            <div className=" w-48 aspect-[3/4] bg-slate-300 mx-auto">
              {interview.posterImage && (
                <Image
                  className=""
                  src={builder.image(interview.posterImage).width(400).url()}
                  width={400}
                  height={600}
                  blurDataURL={interview.posterImage.asset.metadata.lqip}
                  placeholder="blur"
                  alt={interview?.title}
                />
              )}
            </div>
          </div>
          <div className="text-center font-mono text-6xl uppercase">
            Read the
            <br />
            Interview
          </div>
        </div>
      </div>
    </section>
  );
}
