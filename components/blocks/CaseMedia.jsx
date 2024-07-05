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
                <div>
                    <VideoCloudinary
                    data={video}
                    transformation="video-project"
                    autoPlay={true}
                    blockref={_key}
                    />
                </div>
            )}
            {image && (
                <Image
                className=" object-cover"
                src={builder.image(image).width(1500).quality(75).url()}
                width={1500}
                height={1500}
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