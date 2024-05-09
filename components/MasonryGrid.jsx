'use client'
import Masonry from 'react-masonry-css'
import Image from 'next/image';
import Link from 'next/link';
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import { motion } from "framer-motion";
const builder = imageUrlBuilder(client);

export default function MasonryGrid({data}) {

    // const items = [
    //     {id: 1, name: 'My First Item'},
    //     {id: 2, name: 'Another item'},
    //     {id: 3, name: 'Third Item'},
    //     {id: 4, name: 'Here is the Fourth'},
    //     {id: 5, name: 'High Five'}
    //   ];
  

    const items = data;
    // Convert array to JSX items
    const jsxItems = items.map(item => {
      let content = null; // Default content
      
      // Check if displaySettings and ondisplayAlignment exist
      if (item.displaySettings && item.displaySettings.ondisplayAlignment) {
        switch (item.displaySettings.ondisplayAlignment) {
          case "left":
            content = (
              <div className='flex bg-green-400_ justify-start'>
              <Link
                href={`/project/${item.slug.current}`}
                passHref
                className="w-3/4 _lg:w-2/3 bg-red-400_"
              >
              
                {item.posterImage && <Image src={builder.image(item.posterImage).width(1000).url()} alt="" width={1000} height={1000} />}
                <div className="text-sm mt-2">
                    <h2 className="font-medium uppercase tracking-wide">{item.studio?.name}</h2>
                    <div className="font-medium italic">{item.title}</div>
                </div>
              
              </Link>
              </div>
            );
            break;
          case "right":
            content = (
              <div className='flex bg-green-400_ justify-end'>
                <Link
                  href={`/project/${item.slug.current}`}
                  passHref
                  className="w-3/4 _lg:w-2/3 bg-red-400_"
                >
                {item.posterImage && <Image src={builder.image(item.posterImage).width(1000).url()} alt="" width={1000} height={1000} />}
                <div className="text-sm mt-2">
                    <h2 className="font-medium uppercase tracking-wide">{item.studio?.name}</h2>
                    <div className="font-medium italic">{item.title}</div>
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
                className="w-3/4 _lg:w-2/3 bg-red-400_"
              >
                {item.posterImage && <Image src={builder.image(item.posterImage).width(1000).url()} alt="" width={1000} height={1000} />}
                <div className="text-sm mt-2">
                  <h2 className="font-medium uppercase tracking-wide">{item.studio?.name}</h2>
                  <div className="font-medium italic">{item.title}</div>
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
                    src={builder.image(item.mainImage).width(1000).url()}
                    alt=""
                    width={1000}
                    height={1000}
                  />
                ) : (
                  item.posterImage && (
                    <Image
                      src={builder.image(item.posterImage).width(1000).url()}
                      alt=""
                      width={1000}
                      height={1000}
                    />
                  )
                )}                  
                <div className="text-sm mt-2">
                    <h2 className="font-medium uppercase tracking-wide">{item.studio?.name}</h2>
                    <div className="font-medium italic">{item.title}</div>
                  </div>
                  </Link>
                </div>
              );
              break;            
          default:
            content = (
              <>
                {item.posterImage && <Image src={builder.image(item.posterImage).width(1000).url()} alt="" width={1000} height={1000} />}
                <div className="text-sm mt-2">
                    <h2 className="font-medium uppercase tracking-wide">{item.studio?.name}</h2>
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
        // <div className='mx-auto bg-slate-300'>
        <Masonry
				breakpointCols={2}
				className="masonry-grid"
				columnClassName="masonry-grid--column">
        {jsxItems}
		    </Masonry>
        // </div>
	);
}
