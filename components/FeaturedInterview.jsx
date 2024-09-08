import { client } from "@/lib/sanity.client";
import Link from "next/link";
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
	posterImage{crop,hotspot,asset->},
    studio->{name},
  }`);

  //   console.log(fonts)

  return (
    <>
      {interviews.slice(0, 1).map((item) => (
        <section className="px-18 mt-40 mx-auto" key={item._id}>
          <div className="uppercase text-center mb-4 font-medium tracking-wide">
            Interview
          </div>
          <h2 className="mx-auto uppercase text-3xl font-serif text-center mb-4">
            {item.studio.name}
          </h2>
          <div className="font-serif font-light text-xl text-center md:text-left md:text-3xl tracking-[-2%] leading-[120%]">
            <div className="md:grid grid-cols-24">
              <div className="col-start-8 col-span-full">
                Varens finaste detaljer ar aviga.
              </div>
            </div>
            <div className="md:grid grid-cols-24">
              <div className="col-start-6 col-span-full">
                Med respekt for den avancerade
              </div>
            </div>
            <div className="md:grid grid-cols-24">
              <div className="col-start-10 col-span-full">
                skraddarkonsten kastas villkoren om.
              </div>
            </div>
            <div className="md:grid grid-cols-24">
              <div className="col-start-9 col-span-full">
                Former forvrids och smyckas precist.
              </div>
            </div>
            <div className="md:grid grid-cols-24">
              <div className="col-start-6 col-span-full">
                Det skapas nagot nytt, parla for parla.
              </div>
            </div>
            <div className="md:grid grid-cols-24">
              <div className="col-start-5 col-span-full">
                Kanslan ar lekfull och inspirationen granslos
              </div>
            </div>
            <div className="md:grid grid-cols-24">
              <div className="col-start-7 col-span-full">
                {" "}
                — den hamtas i havet, pa himlen och fran din.
              </div>
            </div>
            <div className="md:grid grid-cols-24">
              <div className="col-start-6 col-span-full">
                vardagssrumsmatta.
              </div>
            </div>
          </div>
          {item.posterImage || item.posterImage ? (
            <div className="grid grid-cols-24 mt-20">
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
