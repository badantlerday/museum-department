import Image from "next/image"
import imageUrlBuilder from "@sanity/image-url"
import { dataset, projectId } from "@/sanity/env"

import LinkComponent from "@/components/ui/LinkComponent"

const builder = imageUrlBuilder({ projectId, dataset })

export default function Hero({ data }) {
  const { text, image, link } = data ?? {}
  return (
    <div className="relative min-h-svh max-h-svh min-w-full max-w-full flex items-center justify-center">
      <div className="absolute top-0 right-0 bottom-0 left-0">
        <Image
          className="absolute object-cover top-0 right-0 bottom-0 h-full w-full"
          src={builder.image(image).width(1500).quality(100).url()}
          width={1500}
          height={1500}
          alt={image?.alt || ""}
        />
      </div>
      <div className="relative">
        <h1>{text || ""}</h1>
        {link && <LinkComponent data={link} />}
      </div>
    </div>
  )
}
