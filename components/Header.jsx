export const query = `*[_type == "settings"][0]{
  headerMenu->{
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
import { client } from "@/lib/sanity.client";
import CustomLink from "@/components/CustomLink"
import AnimatedLink from "@/components/AnimatedLink"

export default async function Header() {
// const data = await sanityFetch({ query, tags: ["settings"] })
const data = await client.fetch(query, { cache: 'no-store' });
const { headerMenu } = data || {}

return (
  <header className="fixed top-0 left-0 w-full z-50">
    <nav
				className="flex items-center justify-between py-6 px-4 lg:px-20"
				aria-label="Global"
			>
    {headerMenu?.menuItems && (
      <div className="flex lg:flex-1 text-sm space-x-4 items-center font-medium">
        {headerMenu?.menuItems.map((menuItem, key) => {
          return <CustomLink key={`menu-item-${key}`} data={menuItem} />
        })}
      </div>
    )}
      <div className="hidden lg:flex lg:gap-x-12 text-sm uppercase font-medium tracking-wide">
					<AnimatedLink text="Museum Department" hoverText="Curating Contemporary Culture" url="/" />
			</div>
      <div className="hidden lg:flex lg:flex-1 text-sm lg:justify-end text-s space-x-4 font-medium items-center text-[#999999]"></div>
    </nav>
  </header>
)
}
