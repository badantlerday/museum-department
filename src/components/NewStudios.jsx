import { sanityFetch } from "@/sanity/lib/client";
import { getNewStudios } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Image from "next/image";
import BookmarkButton from "@/components/BookmarkButton";
// import {BookmarkButtonClient} from "@/components/BookmarkButtonClient";

export default async function NewStudios({user,userBookmarks}) {
  const newStudios = await sanityFetch({ query: getNewStudios, tags: ["studio"] })

  return (
    <section className="mb-40">
      <div className="px-10 lg:px-18 mx-auto">
        <h3 className=" text-xl font-medium mb-4 capitalize ">New Studios</h3>
        <div className="grid grid-cols-2 gap-x-4 ">
          {newStudios.slice(0, 2).map((item) => (
            <div key={item._id}>
              <Link href={`/studios/${item.slug?.current}`}>
                {item.mainImage || item.mainImage ? (
                  <Image
                    className="aspect-[4/3] mb-2 object-cover w-full"
                    src={urlFor(item.mainImage).width(1200).url()}
                    width={1200}
                    height={1200}
                    blurDataURL={
                      (item.mainImage || item.mainImage).asset.metadata.lqip
                    }
                    placeholder="blur"
                    alt={item.name}
                  />
                ) : (
                  <div className="w-full aspect-[4/3] bg-md-grey-100 mb-2"></div>
                )}
              </Link>
              <div className="flex">
                <div className="flex-1">
                  <span className="font-medium tracking-wide block uppercase -mb-1">
                    <Link
                      href={`/studios/${item.slug?.current}`}
                      className="hover:text-md-grey-500"
                    >
                      {item.name}
                    </Link>
                  </span>

                  <span className="font-medium italic block">
                    <Link
                      href={`/reference/${item.location[0].slug.current}`}
                      className="hover:text-md-grey-500"
                    >
                      {item.location[0].name}
                    </Link>
                    , {}
                    <Link
                      href={`/reference/${item.location[0].country?.slug.current}`}
                      className="hover:text-md-grey-500"
                    >
                      {item.location[0].country?.name}
                    </Link>
                  </span>
                  
                </div>
                <div>
                  <BookmarkButton
                    documentId={item._id}
                    variant="icon"
                    message={`${item?.name}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
