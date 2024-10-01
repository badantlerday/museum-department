"use client";

import Masonry from "react-masonry-css";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ImageWithLink = ({ item }) => (
  <Link href={`/projects/${item.slug.current}`}>
    <Image
      src={urlFor(item.posterImage || item.mainImage).width(1500).url()}
      alt={item.title || "Project image"}
      width={1500}
      height={1500}
    />
  </Link>
);

const ItemInfo = ({ item }) => (
  <div className="mt-4">
    <h2 className="font-medium uppercase tracking-wide -mb-1">
      <Link
        href={`/projects/${item.slug.current}`}
        className="hover:text-md-grey-500"
      >
        {item.title}
      </Link>
    </h2>
    <div className="font-medium italic">
      <Link
        href={`/studios/${item.studio?.slug.current}`}
        className="hover:text-md-grey-500"
      >
        {item.studio?.name}
      </Link>
    </div>
  </div>
);

const ContentWrapper = ({ alignment, children }) => {
  const alignmentClasses = {
    left: "flex justify-start",
    right: "flex justify-end",
    center: "flex justify-center",
    full: "flex justify-center",
  };

  return (
    <div className={alignmentClasses[alignment] || ""}>
      <div className={alignment === "full" ? "w-full" : "w-3/4"}>
        {children}
      </div>
    </div>
  );
};

export default function MasonryGrid({ data }) {
  const jsxItems = data.map((item) => {
    const alignment = item.displaySettings?.ondisplayAlignment || "default";

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        className="masonry-grid--item"
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.25 }}
        viewport={{ once: true }}
        key={item._id}
      >
        <ContentWrapper alignment={alignment}>
          <ImageWithLink item={item} />
          <ItemInfo item={item} />
        </ContentWrapper>
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