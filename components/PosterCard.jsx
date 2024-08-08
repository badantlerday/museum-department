import BookmarkButton from "@/components/BookmarkButton";
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";

const builder = imageUrlBuilder(client);

export default function Postercard({data,aspect,image}) {
    const {item} = data || {}
    let aspectRatio;

    if(aspect=="landscape"){
        aspectRatio = "aspect-[4/3]"
    }else{
        aspectRatio = "aspect-[3/4]"
    }

	return (
    <div key={item._id} className="relative group">
        {item._type == "project" && (
                <>
        <Link
            href={`/project/${item.slug.current}`}
        >
            {item?.posterImage || item?.posterImage ? (
                
                <Image
                className={` ${aspectRatio} mb-2 object-cover`}
                // className="aspect-[3/4] mb-2 object-cover"
                src={builder
                    .image(item?.posterImage || item?.posterImage)
                    .width(1000)
                    .url()}
                width={800}
                height={665}
                blurDataURL={
                    (item?.posterImage || item?.posterImage).asset
                        .metadata.lqip
                }
                placeholder="blur"
                alt={item.name}
            />
            ) : (
                <div className={` ${aspectRatio} w-full bg-md-grey-100 mb-2`}></div>
            )}
            </Link> 
        <div className="flex">
            <Link
        href={`/project/${item.slug.current}`} className=" flex-1">
                <span className="text-xs font-medium tracking-wide block uppercase">
                    {item.title}
                </span>
                <span className="text-xs font-medium italic block">
                    {item.studio.name}
                </span>
            </Link>
            <div>
                <BookmarkButton documentId={item._id} variant="icon" message={`${item?.title}`} />
            </div>
        </div>
        </>
        )}
        {item._type == "studio" && (
                <>
        <Link
            href={`/studio/${item.slug.current}`}
        >
            {item?.posterImage || item?.posterImage ? (
                
                <Image
                className="aspect-[3/4] mb-2 object-cover"
                src={builder
                    .image(item?.posterImage || item?.posterImage)
                    .width(1000)
                    .url()}
                width={800}
                height={665}
                blurDataURL={
                    (item?.posterImage || item?.posterImage).asset
                        .metadata.lqip
                }
                placeholder="blur"
                alt={item.name}
            />
            ) : (
                <div className="w-full aspect-[3/4] bg-md-grey-100 mb-2"></div>
            )}
            </Link> 
        <div className="flex">
            <Link
        href={`/studio/${item.slug.current}`} className=" flex-1">
                <span className="text-xs font-medium tracking-wide block uppercase">
                    {item.name}
                </span>
                <span className="text-xs font-medium italic block">
                    {item.location[0].name}, {item.location[0].country?.name}
                </span>
            </Link>
            <div>
                <BookmarkButton documentId={item._id} variant="icon" message={`${item?.name}`} />
            </div>
        </div>
        </>
        )}
        {item.foundry && (
                <>
        <Link
            href={`/font/${item.slug.current}`}
        >
            {item?.posterImage || item?.posterImage ? (
                
                <Image
                className="aspect-[3/4] mb-2 object-cover"
                src={builder
                    .image(item?.posterImage || item?.posterImage)
                    .width(1000)
                    .url()}
                width={800}
                height={665}
                blurDataURL={
                    (item?.posterImage || item?.posterImage).asset
                        .metadata.lqip
                }
                placeholder="blur"
                alt={item.name}
            />
            ) : (
                <div className="w-full aspect-[3/4] bg-md-grey-100 mb-2"></div>
            )}
            </Link> 
        <div className="flex">
            <div className=" flex-1">
                <Link href={`/project/${item.slug.current}`} className="">
                <span className="text-xs font-medium tracking-wide block uppercase">
                {item.name}
                </span>
                </Link>
                <Link href={`/foundry/${item.foundry.slug.current}`} className="">
                <span className="text-xs font-medium italic block">
                    {item.foundry.name}
                </span>
                </Link>
            </div>
            <div>
                <BookmarkButton documentId={item._id} variant="icon" message={`${item?.name}`} />
            </div>
        </div>
        </>
        )}
    </div>
    )
};