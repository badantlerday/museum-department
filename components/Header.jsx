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

import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { sanityFetch } from "@/lib/sanity.fetch"
// import { client } from "@/lib/sanity.client";
import CustomLink from "@/components/CustomLink"
import AnimatedLink from "@/components/AnimatedLink"
import Link from "next/link";
import {SearchIcon,HeartIcon} from '@sanity/icons'

export default async function Header() {
  const {
    getAccessToken,
    getBooleanFlag,
    getFlag,
    getIdToken,
    getIntegerFlag,
    getOrganization,
    getPermission,
    getPermissions,
    getStringFlag,
    getUser,
    getUserOrganizations,
    isAuthenticated
} = getKindeServerSession();
const data = await sanityFetch({ query, tags: ["settings"] })
// const data = await client.fetch(query, { cache: 'no-store' });
const { headerMenu } = data || {}
const user = await getUser();

return (
  <header className="fixed top-0 left-0 w-full z-50 bg-white">
    <nav
				className="flex items-center justify-between py-6 px-4 lg:px-16"
				aria-label="Global"
			>
      {/* Left */}
      <div className="lg:flex-1">
      <AnimatedLink text="Museum Department" hoverText="Curating Contemporary Culture" url="/" />
      </div>
      {/* {headerMenu?.menuItems && (
        <div className="flex lg:flex-1 text-sm space-x-4 items-center font-medium">
          {headerMenu?.menuItems.map((menuItem, key) => {
            return <CustomLink key={`menu-item-${key}`} data={menuItem} />
          })}
        </div>
      )} */}
      {/* Center */}
      <div className="hidden lg:flex lg:gap-x-12 text-sm">
					{/* <AnimatedLink text="Museum Department" hoverText="Curating Contemporary Culture" url="/" /> */}
          {headerMenu?.menuItems && (
        <div className="flex lg:flex-1 text-sm space-x-4 items-center font-medium">
          {headerMenu?.menuItems.map((menuItem, key) => {
            return <CustomLink key={`menu-item-${key}`} data={menuItem} />
          })}
        </div>
      )}
			</div>
      {/* Right */}
      <div className="hidden lg:flex lg:flex-1 text-sm lg:justify-end text-s space-x-4 font-medium items-center text-[#999999]">
      
      <Link href="/search">Search</Link>
        {user ? (
          <div className="space-x-4">
          <Link href="/dashboard">My Account</Link>
          {/* <LogoutLink>Log out</LogoutLink> */}
          </div>
        ) : (
          <LoginLink>Sign In</LoginLink>
        )
        }
        
					
      </div>
    </nav>
  </header>
)
}
