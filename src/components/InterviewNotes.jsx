"use client";
import { useState } from "react";
import Image from 'next/image'
import { urlFor } from "@/sanity/lib/image";
export default function InterviewNotes({data}) {
    const [hoveredImage, setHoveredImage] = useState('');
    const [hoveredImageCaption, setHoveredImageCaption] = useState('');
    const footnoteBlocks = data;
    // Create an array to store all footnotes
    const allFootnotes = footnoteBlocks.flatMap((block) =>
        block.markDefs.filter((mark) => mark._type === 'footnote')
    );
    // console.log(allFootnotes);
    // console.log(footnoteBlocks);

    const handleMouseEnter = (imageHoverAsset,imageCaption) => {
        console.log(imageCaption);
        if (imageHoverAsset) {
            setHoveredImage(imageHoverAsset);
        }
        if (imageCaption) {
            setHoveredImageCaption(imageCaption);
        }
    };

    const handleMouseLeave = () => {
        setHoveredImage('');
        setHoveredImageCaption('');
    };



    return (
        <div className="sticky top-0 font-mono text-xs h-screen bg-red-300_">
            <div className="sticky top-20 pb-60 text-md-grey-400">
                <div className="uppercase mb-4">References</div>
                {/* Loop through interview.body to find footnotes */}
                <ol className="list-decimal list-inside">
                {allFootnotes.map((footnote, index) => (
                    <li key={footnote._key} className="mb-1 hover:text-md-black cursor-default"
                        onMouseEnter={() => handleMouseEnter(footnote?.footnoteImage,footnote?.text)}
                        onMouseLeave={handleMouseLeave}
                    >
                    {footnote.title}
                    </li>
                ))}
                </ol>
            </div>
            <div className="absolute bottom-4 w-full pr-4">
            {hoveredImage ? (
                <div className="bg-md-grey-100">
                <Image
                    className="mb-2 object-cover animate-fadeIn"
                    src={urlFor(hoveredImage).width(800).url()}
                    width={800}
                    height={665}
                    alt="Hovered Item"
                />
                
                </div>
            ) : (
                <div className="aspect-[4/3] bg-md-grey-100 hidden"></div>
            )}
                <div className="mt-2 text-md-grey-500">
                {hoveredImageCaption ? (
                    <div>{hoveredImageCaption}</div>
                ) : (
                    <div></div>
                )}
                </div>
            </div>
        </div>
    )
}