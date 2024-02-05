export const query = `{
  "page": *[_type == "page" && slug.current == $slug && _id != *[_type == "settings"][0].homePage->_id][0],
  "settings": *[_type == "settings"][0]
}`

import { PortableText } from "@portabletext/react"
import Blocks from "@/components/Blocks"

export default function PageComponent({ data }) {
  const { page } = data || {}

  if (page?.isTextPage) {
    // Page is text page
    return (
      <main>
        {page?.title ? <h1>{page?.title}</h1> : null}
        {page?.body ? (
          <div className="tailwind-text-styles">
            <PortableText value={page?.body} />
          </div>
        ) : null}
      </main>
    )
  } else {
    // Page is built with blocks
    return <main>{page?.blocks ? <Blocks data={page?.blocks} /> : null}</main>
  }
}
