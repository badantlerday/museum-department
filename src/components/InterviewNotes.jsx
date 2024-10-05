"use client";
import Image from 'next/image'
import { urlFor } from "@/sanity/lib/image";
export default function InterviewNotes({data}) {
    const footnoteBlocks = data;
    // Create an array to store all footnotes
    const allFootnotes = footnoteBlocks.flatMap((block) =>
        block.markDefs.filter((mark) => mark._type === 'footnote')
    );
    // console.log(allFootnotes);
    // console.log(footnoteBlocks);
    return (
        <div className="sticky top-0 font-mono text-xs h-screen bg-red-300_">
            <div className="sticky top-20 pb-60 text-md-grey-400">
                <div className="uppercase mb-4">References</div>
                {/* Loop through interview.body to find footnotes */}
                <ol className="list-decimal list-inside">
                {allFootnotes.map((footnote, index) => (
                    <li key={footnote._key} className="mb-1">
                    {footnote.text}
                    {/* {footnote?.footnoteImage && (
                    <Image
                        className="aspect-video object-cover absolute z-0"
                        src={urlFor(footnote?.footnoteImage).width(400).url()}
                        width={400}
                        height={200}
                        // blurDataURL={footnote?.footnoteImage.asset.metadata.lqip}
                        // placeholder="blur"
                        alt={footnote?.text}
                    />
                    )} */}
                    </li>
                ))}
                </ol>
            </div>
            <div className="absolute bottom-4 w-full pr-4">
                <div className="aspect-[4/3] bg-md-grey-100"></div>
                <div className="mt-4">Reference Content</div>
            </div>
        </div>
    )
}