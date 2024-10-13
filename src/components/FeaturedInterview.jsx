import { client } from "@/sanity/lib/client";
import {stegaClean} from '@sanity/client/stega'
// import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Button from "@/components/Button";
const builder = imageUrlBuilder(client);

export default async function FeaturedInterview({ id }) {
  const interviews = await client.fetch(`*[_type == "interview"]{
    _id,
	  name,
    title,
	  slug,
    textCollageIntro,
	  posterImage{crop,hotspot,asset->},
    studio->{name},
  }`);

  //   console.log(fonts)

  return (
    <>
      {interviews.slice(0, 1).map((item) => (
        <section className="_px-18 mt-40 mx-auto" key={item._id}>
          <div className="uppercase text-center mb-4 font-medium tracking-wide">
            Interview
          </div>
          <h2 className="mx-auto uppercase text-3xl font-serif text-center mb-4">
            {item.studio.name}
          </h2>
          <div className="mx-auto flex items-center flex-col">
              <div>
                {item.textCollageIntro.map((row, index) => {
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
          {item.posterImage || item.posterImage ? (
            <div className="grid grid-cols-24 mt-20 px-18">
              <div className="col-start-8 md:col-start-10 col-span-10 md:col-span-6">
                {/* <div className="aspect-[3/4] relative bg-md-grey-200 h-full mx-auto"></div> */}
                <Image
                  className="aspect-[3/4] mb-2 object-cover"
                  src={builder
                    .image(item.posterImage || item.posterImage)
                    .width(1000)
                    .url()}
                  width={800}
                  height={665}
                  blurDataURL={
                    (item.posterImage || item.posterImage).asset.metadata.lqip
                  }
                  placeholder="blur"
                  alt={item.title}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-24 mt-20">
              <div className="col-start-10 col-span-6">
                <div className="aspect-[3/4] relative bg-md-grey-200 h-full mx-auto"></div>
              </div>
            </div>
          )}

          <div className="text-center mt-8">
            <Button href={`/interviews/${item.slug.current}`}>
              Read the Interview
            </Button>
          </div>
        </section>
      ))}
    </>
  );
}
