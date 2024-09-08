'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
const builder = imageUrlBuilder(client);

export default function Slideshow({ data }) {
    
    const { images } = data
    // console.log(images)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000)

    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div className="pr-0 pl-0 col-span-2 aspect-video">
    <div className="relative">
      {images.map((src, index) => (
        <div
          key={src._ref}
          className={`absolute top-0 left-0 w-full transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={index !== currentImageIndex}
        >
          <Image
            src={builder.image(src).width(2000).quality(80).url()}
            alt={`Slide ${index + 1}`}
            width={2000}
            height={2000}
            // style={{ objectFit: 'cover' }}
            priority={index === 0}
          />
        </div>
      ))}
      {/* <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        {images.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 mx-1 rounded-full ${
              index === currentImageIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            aria-current={index === currentImageIndex}
          />
        ))}
      </div> */}
    </div>
    </div>
  )
}