import BookmarkButton from "@/components/BookmarkButton";
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";

const builder = imageUrlBuilder(client);

export default function Postercard({data}) {
    const {item} = data || {}
	return (
    <div key={item._id} className="relative group">
        {item._type == "project" && (
                <>
        <Link
            href={`/project/${item.slug.current}`}
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
        href={`/project/${item.slug.current}`} className=" flex-1">
                <span className="text-xs font-medium tracking-wide block uppercase">
                    {item.title}
                </span>
                <span className="text-xs font-medium italic block">
                    {item.studio.name}
                </span>
            </Link>
            <div>
                <BookmarkButton documentId={item._id} variant="icon" />
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
                <BookmarkButton documentId={item._id} variant="icon" />
            </div>
        </div>
        </>
        )}
        {item.fontsInUse && (
                <>
        <Link
            href={`/project/${item.slug.current}`}
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
        href={`/project/${item.slug.current}`} className=" flex-1">
                <span className="text-xs font-medium tracking-wide block uppercase">
                {item.fontsInUse.map((font) => (
                    <span key={font._id} className='block'>
                        {font.name}
                    </span>
                ))}	
                </span>
                <span className="text-xs font-medium italic block">
                    {item.studio.name}
                </span>
            </Link>
            <div>
                <BookmarkButton documentId={item._id} variant="icon" />
            </div>
        </div>
        </>
        )}
    </div>
    )
};