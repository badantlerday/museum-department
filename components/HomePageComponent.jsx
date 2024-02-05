export const query = `{
  "page": *[_type == "page" && _id == *[_type == "settings"][0].homePage->_id][0],
  "settings": *[_type == "settings"][0]
}`

import Blocks from "@/components/Blocks"

export default function HomePageComponent({ data }) {
  const { page } = data || {}

  return <main>{page?.blocks ? <Blocks data={page?.blocks} /> : null}</main>
}
