'use client'
import Masonry from 'react-masonry-css'
import Image from 'next/image';
import Link from 'next/link';
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import { motion } from "framer-motion";

const builder = imageUrlBuilder(client);

export default function MasonryGridLeftRight({ data }) {
  const items = data;

  const jsxItems = items.map((item, index) => {
    const isLeft = (index % 4 === 0 || index % 4 === 1); // Left for indices 0, 1, 4, 5, 8, 9, ...
    // const isLeft = index % 2 === 0; // Alternate between left and right
    const justifyClass = isLeft ? 'justify-start' : 'justify-end';

    const content = (
      <div className={`flex ${justifyClass}`}>
        <Link href={`/project/${item.slug.current}`} passHref className="w-3/4">
          {item.posterImage && <Image src={builder.image(item.posterImage).width(1000).url()} alt="" width={1000} height={1000} />}
          <div className="mt-4">
            <h2 className="font-medium uppercase tracking-wide -mb-1">
                {item.fontsInUse.map((font) => (
                    <span key={font._id} className='block'>
                        {font.name}
                    </span>
                ))}	
                {/* {item.name} */}
                </h2>
            <div className="font-medium italic _mt-1">{item.title} by {item.studio.name}</div>
          </div>
        </Link>
      </div>
    );

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        className="masonry-grid--item"
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.25 }}
        viewport={{ once: true }}
        key={item._id}
      >
        {content}
      </motion.div>
    );
  });

  return (
    <Masonry
      breakpointCols={2}
      className="masonry-grid px-10"
      columnClassName="masonry-grid--column"
    >
      {jsxItems}
    </Masonry>
  );
}