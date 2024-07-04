"use client";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

export default function MenuSidebar({ src }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
      className={`fixed inset-0 bg-black bg-opacity-80 flex z-50 duration-200 ${isVisible ? "opacity-1" : "opacity-0 delay-300"}`}
      onClick={handleClose}
    >
      <div
        className={`flex flex-col max-h-full max-w-[100vw] min-w-[100vw] lg:max-w-[700px] lg:min-w-[700px] bg-md-grey-100 absolute  top-0 right-0 bottom-0 duration-300 ${isVisible ? "translate-x-[0%] delay-200" : "translate-x-[100%] delay-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-3 md:px-5 lg:pr-18 lg:pl-14 py-6 text-sm flex justify-between items-center">
          <div></div>
          <button className="link" onClick={handleClose}>
            <X strokeWidth={1} size={20} />
          </button>
        </div>
        <div className=" flex flex-col gap-1 lg:pr-18 lg:pl-14 font-mono text-3xl">
          <Link href="/" onClick={handleClose}>On Display</Link>
          <Link href="/studios" onClick={handleClose}>Design Studios</Link>
          <Link href="/projects" onClick={handleClose}>Projects</Link>
          <Link href="/fonts-gallery" onClick={handleClose}>Fonts Gallery</Link>
          <Link href="/fonts-in-use" onClick={handleClose}>Fonts In Use</Link>
          <Link href="/interviews" onClick={handleClose}>Interviews</Link>
          <Link href="/jobs" onClick={handleClose}>Jobs</Link>
          <Link href="/dashboard" onClick={handleClose}>Bookmarks</Link>
      </div>
      <div className=" flex flex-col gap-1 lg:pr-18 lg:pl-14 mt-8">
          <Link href="/about" onClick={handleClose}>About</Link>
          <Link href="/advertise" onClick={handleClose}>Advertise</Link>
          <Link href="/become-a-patron" onClick={handleClose}>Become a patron</Link>
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