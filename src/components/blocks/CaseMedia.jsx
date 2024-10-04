"use client";

import Image from "next/image";
import {stegaClean} from '@sanity/client/stega'
import { PortableText } from "@portabletext/react";
import VideoCloudinary from "@/components/VideoCloudinary";
import { urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";

export default function CaseMedia({ data }) {
    const { caption, image, video, layoutoptions, sticky, _key } = data ?? {}
    const layout = stegaClean(layoutoptions)
	return (
        <>
        {layoutoptions =="50_space_left" && (
            <div></div>
        )}
        <div className={`
        ${layout =="50_gutter_right" ? 'pr-2' : 'pr-0'} 
        ${layout =="50_gutter_left" ? 'pl-2' : 'pl-0'} 
        ${layout =="full_width" ? 'col-span-2' : ''} 
        ${layout =="half_width" ? '' : ''} 
        `}>
        <motion.div
            className={`${sticky ? 'sticky top-0' : ''}`}
            initial={{ opacity: 0, }}
            whileInView={{ opacity: 1,}}
            transition={{
                duration: 0.75
            }}
            viewport={{ once: true }}
         >
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
                className="w-full object-cover animate-fadeIn"
                // src={builder.image(image).width(2000).quality(80).url()}
                src={urlFor(image).width(2000).url()}
                width={2000}
                height={2000}
                blurDataURL={image?.asset.metadata.lqip}
                placeholder="blur"
                alt={image?.alt || ""}
                />
            )}
            {caption && (
                <div className="font-mono text-xs mt-4 leading-[140%] text-md-grey-400 max-w-[80%]">
                    <PortableText value={caption} />
                </div>
            )}
        </motion.div>
        </div>
        {layout =="50_space_right" && (
            <div></div>
        )}
        </>
	);
}