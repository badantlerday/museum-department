export const query = `*[_type == "settings"][0]{
    footerMenu->{
        title,
        menuItems[] {
            ...,
            internal->{
                title,
                "type": _type,
                "slug": slug.current
            }
        }
    },
}`

import { sanityFetch } from "@/lib/sanity.fetch"
import CustomLink from "@/components/CustomLink"

export default async function Footer() {
  const data = await sanityFetch({ query, tags: ["settings"] })
  const { footerMenu } = data || {}

  return (
    <footer className="border-t p-12">
      Footer menu
      {footerMenu?.menuItems && (
        <div className="flex gap-4">
          {footerMenu?.menuItems.map((menuItem, key) => {
            return <CustomLink key={`menu-item-${key}`} data={menuItem} />
          })}
        </div>
      )}
    </footer>
  )
}
