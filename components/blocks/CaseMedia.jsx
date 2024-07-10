import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import { client } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import VideoCloudinary from "@/components/VideoCloudinary";

const builder = imageUrlBuilder(client);

export default function CaseMedia({ data }) {
    // console.log(data);
    const { caption, image, video, layoutoptions, sticky, _key } = data ?? {}
	return (
        <>
        {layoutoptions =="50_space_left" && (
            <div></div>
        )}
        <div className={`
        ${layoutoptions =="50_gutter_right" ? 'pr-2' : 'pr-0'} 
        ${layoutoptions =="50_gutter_left" ? 'pl-2' : 'pl-0'} 
        ${layoutoptions =="full_width" ? 'col-span-2' : ''} 
        ${layoutoptions =="half_width" ? '' : ''} 
        `}>
        <div className={`${sticky ? 'sticky top-0' : ''}`}>
            {video && (
                <VideoCloudinary
                data={video}
                transformation="video-project"
                autoPlay={true}
                blockref={_key}
                />
            )}
            {image && (
                <Image
                className="w-full object-cover"
                src={builder.image(image).width(2000).quality(80).url()}
                width={2000}
                height={2000}
                alt={image?.alt || ""}
                />
            )}
            {caption && (
                <div className="font-mono text-xs mt-4 leading-[140%] text-md-grey-400 max-w-[50%]">
                    <PortableText value={caption} />
                </div>
            )}
            </div>
        </div>
        {layoutoptions =="50_space_right" && (
            <div></div>
        )}
        </>
	);
}