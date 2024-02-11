import { PortableText } from "@portabletext/react"
import Image from "next/image"
import imageUrlBuilder from "@sanity/image-url"
import { dataset, projectId } from "@/sanity/env"

const builder = imageUrlBuilder({ projectId, dataset })

export default function Split({ data = {} }) {
  const { title, text, image, imageAlignment } = data || {}

  return (
    <div className="grid grid-cols-12">
      <div
        className={`col-span-12 lg:col-span-6 ${
          imageAlignment == "right" ? "lg:col-start-7 lg:order-2" : ""
        }`}>
        <Image
          className=""
          src={builder.image(image).width(900).quality(100).url()}
          width={900}
          height={900}
          alt={image.alt || ""}
        />
      </div>
      <div
        className={`col-span-12 lg:col-span-4 ${
          imageAlignment == "right"
            ? "lg:col-start-2 lg:order-1"
            : "lg:col-start-8"
        }`}>
        {title ? <h2>{title}</h2> : null}
        {text ? (
          <div className="tailwind-text-styles">
            <PortableText value={text} />
          </div>
        ) : null}
      </div>
    </div>
  )
}
