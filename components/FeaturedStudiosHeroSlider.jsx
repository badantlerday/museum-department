"use client";
import { useState } from "react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

const builder = imageUrlBuilder(client);

export default function FeaturedStudiosHeroSlider({data}) {
    const studios = data

    // const [sliderRef, instanceRef] = useKeenSlider(
    //   {
    //     slideChanged() {
    //       console.log('slide changed')
    //     },
    //   },
    //   [
    //     // add plugins here
    //   ]
    // )

  const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [sliderRef, instanceRef] = useKeenSlider(
		{
			loop: true,
			slideChanged(slider) {
				setCurrentSlide(slider.track.details.rel);
				// console.log("slide changed");
			},
			slides: { perView: 1, spacing: 0 },
			// defaultAnimation: { duration: 1500 },
			created() {
				setLoaded(true);
			},
		},
		[
			(slider) => {
				let timeout;
				let mouseOver = false;
				function clearNextTimeout() {
					clearTimeout(timeout);
				}
				function nextTimeout() {
					clearTimeout(timeout);
					// if (mouseOver) return;
					timeout = setTimeout(() => {
						slider.next();
					}, 4000);
				}
				slider.on("created", () => {
					// slider.container.addEventListener("mouseover", () => {
					// 	mouseOver = true;
					// 	clearNextTimeout();
					// });
					// slider.container.addEventListener("mouseout", () => {
					// 	mouseOver = false;
					// 	nextTimeout();
					// });
					nextTimeout();
				});
				slider.on("dragStarted", clearNextTimeout);
				slider.on("animationEnded", nextTimeout);
				slider.on("updated", nextTimeout);
			},
		]
	);
  
    return (
      <div className=" h-full relative">
        
      <div ref={sliderRef} className="keen-slider h-full">
        {studios.slice(0, 6).map((item) => (
        <div className="keen-slider__slide h-full" key={item._id}>
          <div className="relative bg-md-grey-200 h-full">
          
            {item.mainImage &&
            <div className="absolute top-0 right-0 bottom-0 left-0">
              <Image
                className="absolute object-cover top-0 right-0 bottom-0 h-full w-full"
                src={builder.image(item.mainImage).width(1500).quality(100).url()}
                width={1500}
                height={1500}
                alt={item.mainImage?.alt || ""}
              />
            </div>
          }
          </div>
        </div>
        ))}
        
      </div>
      {loaded && instanceRef.current && (
						<div className="dots flex">
							{[
								...Array(
									instanceRef.current.track.details.slides.length
								).keys(),
							].map((idx) => {
								return (
									<button
										key={idx}
										onClick={() => {
											instanceRef.current?.moveToIdx(idx);
										}}
										className={
											"dot grow" + (currentSlide === idx ? " active" : "")
										}
									></button>
								);
							})}
						</div>
					)}
      </div>
    )
  }
