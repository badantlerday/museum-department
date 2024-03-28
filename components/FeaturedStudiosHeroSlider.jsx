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
        {studios.slice(0, 4).map((item) => (
        <div className="keen-slider__slide h-full" key={item._id}>
          <div className="relative bg-md-grey-100 h-full">
            <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center">
				
						<h1 className=" text-7xl tracking-wide uppercase mb-1 z-20 mx-auto font-mono text-white max-w-xl text-center">
							{item.name}
						</h1>
						<div className="absolute bottom-4 z-20 uppercase text-white text-center w-full font-mono text-md">
							A Design Studio from {item.location[0].name},{" "}
							{item.location[0].country.name}
						</div>
						<div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-[0.15] z-10"></div>
						{item.mainImage &&
						<Image
							className="aspect-video object-cover absolute z-0"
							src={builder.image(item.mainImage).width(2400).url()}
							width={3000}
							height={900}
							blurDataURL={item.mainImage.asset.metadata.lqip}
							placeholder="blur"
							alt={item?.name}
						/>
					}
            </div>
          
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
