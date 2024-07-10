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
    <Link
        href={`/studio/${item.studio.slug.current}`}
    >
        {item.studio?.posterImage || item.studio?.posterImage ? (
            
            <Image
            className="aspect-[3/4] mb-2 object-cover"
            src={builder
                .image(item.studio?.posterImage || item.studio?.posterImage)
                .width(1000)
                .url()}
            width={800}
            height={665}
            blurDataURL={
                (item.studio?.posterImage || item.studio?.posterImage).asset
                    .metadata.lqip
            }
            placeholder="blur"
            alt={item.studio.name}
        />
        ) : (
            <div className="w-full aspect-[3/4] bg-md-grey-100 mb-2"></div>
        )}
        </Link>
        <div className="flex">
            <Link
        href={`/studio/${item.studio.slug.current}`} className=" flex-1">
                <span className="text-xs font-medium tracking-wide block uppercase">
                    {item.studio.name} ({item.studio.countProjects})
                </span>
                <span className="text-xs font-medium italic block">
                    {item.studio.location[0].name}, {item.studio.location[0].country?.name}
                </span>
            </Link>
            <div>
                <BookmarkButton documentId={item._id} variant="icon" />
            </div>
        </div>
    </div>
    )
};