"use client";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { client } from "@/lib/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
const builder = imageUrlBuilder(client);
import Link from "next/link";
import { X } from "lucide-react";
import AnimatedLink from "@/components/AnimatedLink"
import Button from "./Button";
import VideoCloudinary from "@/components/VideoCloudinary";

export default function MenuBig({ src, projects }) {
  const project = projects;
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
// console.log(project)


  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const lightboxContent = (
  <div
    className={`fixed inset-0 bg-md-black bg-opacity-80 flex z-50 duration-200 ${isVisible ? "opacity-1" : "opacity-0 _delay-200"}`}
    onClick={handleClose}
  >
    <div
      className={`flex flex-col max-h-full max-w-[100vw] min-w-[100vw] _lg:max-w-[700px] _lg:min-w-[700px] bg-md-grey-100 absolute top-0 left-0 bottom-0 duration-300 ${isVisible ? "translate-y-[0%] _delay-100" : "-translate-y-[100%] delay-0"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-18 py-7 flex items-center">
        <div className="flex flex-1">
          <AnimatedLink text="Museum Department" hoverText="Curating Contemporary Culture" url="/" />
        </div>
        <div className="flex items-center">
          <button className="link" onClick={handleClose}>
            <X strokeWidth={1} size={20} />
          </button>
        </div>
      </div>
      <div className="bg-red-300_ flex-grow">
        <div className="grid grid-cols-24 gap-4 h-full px-18">
          <div className="col-span-5 flex items-end">
            <div className=" bg-red-200_ w-full pb-6">

            <div className="text-xs uppercase tracking-wide">Latest Project</div>
            <Link href={`/project/${project.slug.current}`} onClick={handleClose}>
            {project?.mainImage ? (							
                <Image
                    className="aspect-[4/3]_ my-2 _object-fit"
                    src={builder.image(project.mainImage).width(1000).url()}
                    width={800}
                    height={665}
                    blurDataURL={project.mainImage.asset.metadata.lqip}
                    placeholder="blur"
                    alt={project.title}
                />
            ) : project?.mainVideo ? (
              <div className="my-2">
                <VideoCloudinary
                data={project.mainVideo}
                transformation="video-project"
                autoPlay={true}
                blockref={project._id}
                />
                </div>
            ) : (
                <div className="bg-md-grey-200 aspect-[4/3] my-2 "></div>
            )}
            </Link>
            <div className="text-xs uppercase tracking-wide">{project.title}</div>
            <div className="text-xs tracking-wide">{project.studio.name}</div>


            </div>
          </div>
          <div className="menu-links col-start-17 col-span-full bg-emerald-100_ relative">

            <div className=" flex flex-col gap-1 font-mono text-3xl">
              <Link href="/" onClick={handleClose}>On Display</Link>
              <Link href="/studios" onClick={handleClose}>Design Studios</Link>
              {/* <Link href="/projects" onClick={handleClose}>Projects</Link> */}
              <Link href="/fonts-gallery" onClick={handleClose}>Fonts Gallery</Link>
              <Link href="/fonts-in-use" onClick={handleClose}>Fonts In Use</Link>
              <Link href="/interviews" onClick={handleClose}>Interviews</Link>
              <Link href="/jobs" onClick={handleClose}>Jobs</Link>
              <Link href="/dashboard" onClick={handleClose}>Bookmarks</Link>
            </div>
            <div className="flex flex-col gap-1 mt-8 text-xs">
                <Link href="/about" onClick={handleClose}>About</Link>
                <Link href="/advertise" onClick={handleClose}>Advertise</Link>
                <Link href="/become-a-patron" onClick={handleClose}>Become a patron</Link>
            </div>
            <div className="flex flex-col gap-1 mt-8 text-xs">
                <a href="https://www.instagram.com">Instagram</a>
                <a href="https://www.facebook.com">LinkedIn</a>
                <a href="https://www.twitter.com">Twitter</a>
                <a href="https://www.twitter.com">Spotify</a>
            </div>
            <div className=" absolute bottom-0 pb-16 w-full">
              <div className="text-xs tracking-wide mb-1">Newsletter</div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input type="text" className="border border-md-black bg-md-grey-100 text-base w-full p-2" />
                </div>
                <div>
                  <Button>Subscribe</Button>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  </div>
  );

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center gap-1 text-sm [&>svg]:h-2 [&>svg]:w-auto"
      >
        <Image
            src="/icon-menu.svg"
            width={24}
            height={24}
            alt="Search"
        />
      </button>
      {isOpen && ReactDOM.createPortal(lightboxContent, document.body)}
    </>
  );
}