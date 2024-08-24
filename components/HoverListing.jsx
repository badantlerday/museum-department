'use client';
import { useState } from "react";
import { client } from "@/lib/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
// import BookmarkButton from "./BookmarkButton";

const builder = imageUrlBuilder(client);

function urlFor(source) {
    return builder.image(source);
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export default function HoverListing({ data, sectionHeader = "Section Header"}) {
    const [hoveredImage, setHoveredImage] = useState('');
    const [items, setItems] = useState(data);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

    // console.log(items);

    const handleMouseEnter = (imageHoverAsset) => {
        if (imageHoverAsset) {
            setHoveredImage(imageHoverAsset);
        }
    };

    const handleMouseLeave = () => {
        setHoveredImage('');
    };

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
        <section>
            <div className="px-18 mx-auto">
                <h3 className="text-xl font-medium mb-4 border-b border-[#E6E6E6] pb-4">{sectionHeader}</h3>
            </div>
            <div className="grid grid-cols-12 gap-4 px-18 mx-auto">
                <div className="col-span-4 ">
                    <div className="sticky top-0">
                        <div className="col-span-4 text-xs uppercase mb-10 opacity-0">
                            Filter
                        </div>
                        {hoveredImage ? (
                            <Image
                                className="mb-2 object-cover animate-fadeIn"
                                src={urlFor(hoveredImage).width(1000).url()}
                                width={800}
                                height={665}
                                blurDataURL={hoveredImage.asset.metadata.lqip}
                                placeholder="blur"
                                alt="Hovered Item"
                            />
                        ) : (
                            <div className="bg-md-grey-100 aspect-[4/3]"></div>
                        )}
                    </div>
                </div>
            {items[0]._type === 'studio' && (
                <div className="col-span-8 pl-6">
                    <div className="grid grid-cols-4 text-xs uppercase mb-10 sticky top-0 bg-white z-10">
                        <div></div>
                        <div></div>
                        <div className="cursor-pointer" onClick={() => sortBy('name')}>
                            Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </div>
                        <div className="cursor-pointer" onClick={() => sortBy('location.0.name')}>
                            Location {sortConfig.key === 'location.0.name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </div>
                    </div>
                    {items.map((item) => (
                        <div
                            key={item._id}
                            className="group grid grid-cols-4 text-xs text-md-grey-300 hover:text-md-black _mb-6 py-[3px] _hover:bg-md-grey-100"
                            onMouseEnter={() => handleMouseEnter(item.mainImage)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div></div>
                            <div></div>
                            <div className="relative">
                                <div className="absolute -left-6 top-[1.5px] hidden group-hover:block">
                                    <Image
                                        src="/icon-bookmark.svg"
                                        width={10}
                                        height={15}
                                        alt="Sign in to bookmark"
                                    />
                                </div>
                                <Link href={`/studio/${item.slug.current}`}>{item.name}</Link>
                            </div>
                            <div>{item.location[0].name}, {item.location[0].country?.name}</div>
                            {/* <div>{item.location[0].name}, {item.location[0].country?.name}</div>
                            <div className=" col-span-1">{item.location[0].name}, {item.location[0].country?.name}</div> */}
                        </div>
                    ))}
                </div>
            )}
            {items[0]._type === 'typeface' && (
                <div className="col-span-8 pl-6">
                    <div className="grid grid-cols-12 text-xs uppercase mb-10 sticky top-0 bg-white z-10">
                        <div className="cursor-pointer col-start-3 col-span-3" onClick={() => sortBy('name')}>
                            Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </div>
                        <div className="cursor-pointer col-span-3" onClick={() => sortBy('foundry.name')}>
                            Foundry {sortConfig.key === 'foundry.name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </div>
                        <div className="cursor-pointer col-span-3" onClick={() => sortBy('style')}>
                            Style {sortConfig.key === 'style' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </div>
                        <div className="cursor-pointer col-span-1" onClick={() => sortBy('realaseYear')}>
                            Year {sortConfig.key === 'realaseYear' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </div>
                    </div>
                    {items.map((item) => (
                        <div
                            key={item._id}
                            className="group grid grid-cols-12 text-xs text-md-grey-300 hover:text-md-black _mb-6 py-[3px] _hover:bg-md-grey-100"
                            onMouseEnter={() => handleMouseEnter(item.specimenPoster)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="relative col-start-3 col-span-3">
                                <div className="absolute -left-6 top-[1.5px] hidden group-hover:block">
                                    <Image
                                        src="/icon-bookmark.svg"
                                        width={10}
                                        height={15}
                                        alt="Sign in to bookmark"
                                    />
                                </div>
                                <Link href={`/studio/${item.slug.current}`}>{item.name}</Link>
                            </div>
                            <div className="col-span-3">{item.foundry.name}</div>
                            <div className="col-span-3">{item.style}</div>
                            <div className="col-span-1">{item.realaseYear}</div>
                        </div>
                    ))}
                </div>
            )}
            {/* {items[0]._type === 'typeface' && (
                <div className="col-span-8">
                    <div className="grid grid-cols-4 text-xs uppercase mb-10">
                        <div></div>
                        <div></div>
                        <div className="cursor-pointer" onClick={() => sortBy('name')}>
                            Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </div>
                        <div className="cursor-pointer" onClick={() => sortBy('foundry.name')}>
                            Foundry {sortConfig.key === 'foundry.name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </div>
                    </div>
                    {items.map((item) => (
                        <div
                            key={item._id}
                            className="group grid grid-cols-4 text-xs text-md-grey-300 hover:text-black mb-1 py-[1px] _hover:bg-md-grey-100"
                            onMouseEnter={() => handleMouseEnter(item.mainImage)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div></div>
                            <div></div>
                            <div className="relative">
                                <div className="absolute -left-6 top-[1.5px] hidden group-hover:block">
                                    <Image
                                        src="/icon-bookmark.svg"
                                        width={10}
                                        height={15}
                                        alt="Sign in to bookmark"
                                    />
                                </div>
                                {item.name}
                            </div>
                            <div>{item.foundry.name}</div>
                        </div>
                    ))}
                </div>
            )} */}
            </div>
        </section>
    );
}
