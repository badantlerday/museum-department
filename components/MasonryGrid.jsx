'use client'
import Masonry from 'react-masonry-css'
import Image from 'next/image';
import Link from 'next/link';
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import { motion } from "framer-motion";
const builder = imageUrlBuilder(client);

export default function MasonryGrid({data}) {
  
    const items = data;
    // Convert array to JSX items
    const jsxItems = items.map(item => {
      let content = null; // Default content
      
      // Check if displaySettings and ondisplayAlignment exist
      if (item.displaySettings && item.displaySettings.ondisplayAlignment) {
        switch (item.displaySettings.ondisplayAlignment) {
          case "left":
            content = (
              <div className='flex justify-start'>
              <Link
                href={`/project/${item.slug.current}`}
                passHref
                className="w-3/4"
              >
              
                {item.posterImage && <Image src={builder.image(item.posterImage).width(1500).url()} alt="" width={1500} height={1500} />}
                <div className="mt-2">
                    <h2 className="font-medium uppercase tracking-wide -mb-1">{item.studio?.name}</h2>
                    <div className="font-medium italic">{item.title}</div>
                </div>
              
              </Link>
              </div>
            );
            break;
          case "right":
            content = (
              <div className='flex justify-end'>
                <Link
                  href={`/project/${item.slug.current}`}
                  passHref
                  className="w-3/4"
                >
                {item.posterImage && <Image src={builder.image(item.posterImage).width(1500).url()} alt="" width={1500} height={1500} />}
                <div className="mt-2">
                <h2 className="font-medium uppercase tracking-wide -mb-1">{item.title}</h2>
                  <div className="font-medium italic">{item.studio?.name}</div>
                </div>
              </Link>
              </div>
            );
            break;
          case "center":
            content = (
              <div className='flex bg-green-400_ justify-center'>
              <Link
                href={`/project/${item.slug.current}`}
                passHref
                className="w-3/4"
              >
                {item.posterImage && <Image src={builder.image(item.posterImage).width(1500).url()} alt="" width={1500} height={1500} />}
                <div className="mt-2">
                  <h2 className="font-medium uppercase tracking-wide -mb-1">{item.title}</h2>
                  <div className="font-medium italic">{item.studio?.name}</div>
                </div>
                </Link>
              </div>
            );
            break;
            case "full":
              content = (
                <div className='flex bg-green-400_ justify-center'>
                <Link
                  href={`/project/${item.slug.current}`}
                  passHref
                  className=""
                >
                {item.mainImage ? (
                  <Image
                    src={builder.image(item.mainImage).width(1500).url()}
                    alt=""
                    width={1500}
                    height={1500}
                  />
                ) : (
                  item.posterImage && (
                    <Image
                      src={builder.image(item.posterImage).width(1500).url()}
                      alt=""
                      width={1500}
                      height={1500}
                    />
                  )
                )}                  
                <div className="mt-2">
                <h2 className="font-medium uppercase tracking-wide -mb-1">{item.title}</h2>
                  <div className="font-medium italic">{item.studio?.name}</div>
                  </div>
                  </Link>
                </div>
              );
              break;            
          default:
            content = (
              <>
                {item.posterImage && <Image src={builder.image(item.posterImage).width(1500).url()} alt="" width={1500} height={1500} />}
                <div className="mt-2">
                    <h2 className="font-medium uppercase tracking-wide -mb-1">{item.studio?.name}</h2>
                    <div className="font-medium italic">{item.title}</div>
                </div>
              </>
            );
        }
      }
    
      return (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          className="masonry-grid--item"
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            delay: 0.25,
            // bounce: 0.2,
            // type: "spring",
          }}
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
				className="masonry-grid px-10 _px-2"
				columnClassName="masonry-grid--column">
        {jsxItems}
        <div className='masonry-grid--item '>
          <div className='bg-[#F6F5F3] p-28'>
          <h2 className='uppercase font-medium tracking-wide'>JOIN OUR COMMUNITY</h2>
          <p>Receive our weekly curated roundup newsletter. Get news about interviews, fonts, new products, and new features.</p>
          </div>
        </div>
		    </Masonry>
	);
}
