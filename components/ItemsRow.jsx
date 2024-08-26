import Link from "next/link";
import { client } from "@/lib/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
const builder = imageUrlBuilder(client);
export default function ItemsRow({ title = "Title", link, data }) {
  return (
    <div className="grid grid-cols-6 gap-4 my-10">
      <div className="border-t border-b border-md-grey-200 py-2 grid grid-cols-2 relative">
        <h2 className="uppercase font-light text-3xl leading-[120%] ">{title}</h2>
        <Link
          href={link}
          className="uppercase font-medium col-span-2 absolute bottom-2 text-[11px] tracking-[3%]"
        >
          Explore more
        </Link>
      </div>

      {/* {[...Array(5)].map((_, index) => ( */}
      {data?.slice(0, 5).map((item, index) => (
        <div
          key={item._id}
          className="border-t border-b border-md-grey-200 py-2 grid grid-cols-2"
        >
          <div className="mr-2">
            {/* <div className="aspect-[4/5] bg-md-grey-200 mr-2"></div> */}
            {item.posterImage || item.posterImage ? (
              <Link href={`/project/${item.slug?.current}`}>
                <Image
                  className="aspect-[3/4] object-cover"
                  src={builder
                    .image(item.posterImage || item.posterImage)
                    .width(500)
                    .url()}
                  width={200}
                  height={400}
                  blurDataURL={
                    (item.posterImage || item.posterImage).asset.metadata.lqip
                  }
                  placeholder="blur"
                  alt={item.title}
                />
              </Link>
            ) : (
              <Link href={`/project/${item.slug?.current}`}>
                <div className="aspect-[3/4] bg-md-grey-200 mr-2"></div>
              </Link>
            )}
          </div>
          <div className="flex flex-col text-[11px]">
            <div className="grow uppercase font-medium tracking-[3%] flex flex-col">
              {item.fontsInUse.map((font) => (
                <div key={font._id} className="truncate">
                  <Link
                    href={`/font/${font.slug?.current}`}
                    className="hover:text-md-grey-500"
                    alt={font.name}
                  >
                    {font.name}
                  </Link>
                </div>
              ))}
            </div>
            <div className=" text-md-black">
              <Link
                href={`/project/${item.slug?.current}`}
                className="hover:text-md-grey-500"
              >
                {item.title}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
