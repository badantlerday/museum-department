import Link from "next/link";
import { client } from "@/lib/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
const builder = imageUrlBuilder(client);

export default async function FontsInUseListing() {

    const fonts = await client.fetch(`*[_type == "project" && defined(fontsInUse)] {
        _id, 
        title, 
        slug, 
        studio->{name,slug}, 
        fontsInUse[]->{name,_id,slug},
        posterImage{crop,hotspot,asset->},
    }`);

return (
<div className="px-10 lg:px-18 mx-auto mb-40">
        <div className="flex gap-10 border-b border-md-grey-200 mb-[10px]">
            <h3 className=" text-xl font-medium mb-2">In Use</h3>
        </div>
        <div className="mb-10 text-xs uppercase">
            Filter
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
            {fonts.slice(0,18).map((item) => (
                <Link
                    key={item._id}
                    href={`/project/${item.slug.current}`}
                    passHref
                    className="relative group"
                >
                    {item.posterImage || item.posterImage ? (
                        
                        <Image
                        className="aspect-[3/4] mb-2 object-cover"
                        src={builder
                            .image(item.posterImage || item.posterImage)
                            .width(1000)
                            .url()}
                        width={800}
                        height={665}
                        blurDataURL={
                            (item.posterImage || item.posterImage).asset
                                .metadata.lqip
                        }
                        placeholder="blur"
                        alt={item.name}
                    />
                    ) : (
                        <div className="w-full aspect-[3/4] bg-md-grey-200 mb-2"></div>
                    )}
                    <div className="flex">
                        <div className=" grow">
                            <span className="text-xs font-medium tracking-wide block uppercase">
                            {item.fontsInUse.map((font) => (
                                <div key={font._id}>
                                    {font.name}
                                </div>
                            ))}	
                                
                            </span>
                            <span className="text-xs font-medium italic block">
                            {item.title}
                            </span>
                        </div>
                        <div>
                            <Image
                                src="/icon-bookmark.svg"
                                width={10}
                                height={15}
                                alt="Bookmark"
                            />
                        </div>
                    </div>
                </Link>
            ))}				
        </div>
    </div>
	);
}
