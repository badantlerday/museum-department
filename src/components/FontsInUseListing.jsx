"use client"
import { useState } from "react";
// import { client } from "@/lib/sanity.client";
// import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import BookmarkButtonClient from "@/components/BookmarkButtonClient";

// const builder = imageUrlBuilder(client);

function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export default function FontsInUseListing({data,userBookmarks,user}) {
    const [items, setItems] = useState(data);
    const [sortConfig, setSortConfig] = useState({ key: 'publishedAt', direction: 'asc' });

    const sortBy = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedData = [...items].sort((a, b) => {
            const aValue = getNestedValue(a, key);
            const bValue = getNestedValue(b, key);

            if (aValue < bValue) {
                return direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setItems(sortedData);
    };

return (
<div className="px-10 lg:px-18 mx-auto mb-40">
        <div className="flex gap-10">
            <h3 className=" text-xl font-medium mb-2">In Use</h3>
        </div>
		<div className=" sticky top-0 bg-white pb-2 z-10 mb-10">
			<nav className="border-t border-md-grey-200 flex">
				<div className=" flex-1">
					<ul className="flex text-xs uppercase tracking-wider text-md-grey-300 *:pt-2 mt-[-1px]">
						
						<li>Filter</li>
					</ul>
				</div>
				<div>
					<ul className="flex text-xs uppercase tracking-wider text-md-grey-300 *:pt-2 space-x-4 mt-[-1px]">
						{/* <li className="text-md-black border-t border-md-black">Date added</li> */}
                        <li className={`cursor-pointer border-t ${sortConfig.key === 'publishedAt' ? 'text-md-black border-md-black' : 'border-md-grey-300'}`} onClick={() => sortBy('publishedAt')}>
                            Date added {sortConfig.key === 'publishedAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </li>
                        <li className={`cursor-pointer border-t ${sortConfig.key === 'title' ? 'text-md-black border-md-black' : ' border-md-grey-300'}`} onClick={() => sortBy('title')}>
                        Project {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </li>
						
					</ul>
				</div>
			</nav>
		</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
            {items.slice(0,18).map((item) => (
                <div key={item._id}>
                <Link
                    href={`/project/${item.slug.current}`}
                    className="relative group"
                >
                    {item.posterImage || item.posterImage ? (
                        
                        <Image
                        className="aspect-[3/4] mb-2 object-cover"
                        src={urlFor(item.posterImage).width(1000).url()}
                        // src={builder
                        //     .image(item.posterImage || item.posterImage)
                        //     .width(1000)
                        //     .url()}
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
                    </Link>
                    <div className="flex">
                        <div className=" grow">
                            <span className="text-xs font-medium tracking-wide block uppercase">
                            {item.fontsInUse.map((font) => (
                                <div key={font._id}>
                                    <Link href={`/font/${font.slug.current}`} className="hover:text-md-grey-500">{font.name}</Link>
                                </div>
                            ))}	
                                
                            </span>
                            <span className="text-xs font-medium italic block">
                            <Link href={`/project/${item.slug.current}`} className="hover:text-md-grey-500">{item.title}</Link>
                            </span>
                        </div>
                        <div>
                            <BookmarkButtonClient
                                documentId={item._id}
                                variant="icon"
                                userBookmarks={userBookmarks}
                                user={user}
                                message={item.title}
                            />
                        </div>
                    </div>
                </div>
            ))}				
        </div>
    </div>
	);
}
