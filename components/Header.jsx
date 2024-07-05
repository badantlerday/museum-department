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
// import CustomLink from "@/components/CustomLink"
import AnimatedLink from "@/components/AnimatedLink"
import Link from "next/link";
import Image from "next/image";
import MenuSidebar from "@/components/MenuSidebar";
import CurrentPageHeader from "@/components/CurrentPageHeader";
// import {SearchIcon,HeartIcon} from '@sanity/icons'

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


const queryPageTitles = `*[_type in ["project","studio","typeface","foundry"]]{
    _type,
		title,
    name,
		slug,
	  }`;
const allPageTitles = await sanityFetch({ query: queryPageTitles, tags: ["project"] })
// console.log(allPageTitles)

return (
  <header className="_fixed top-0 left-0 w-full z-50 bg-white">
    <nav
				className="flex items-center justify-between py-6 px-4 lg:px-18"
				aria-label="Global"
			>
      {/* Left */}
      <div className="lg:flex-1 items-center">
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
        <div className="flex lg:flex-1 space-x-4 items-center">
          <CurrentPageHeader data={allPageTitles} />
        </div>
      )}
			</div>
      {/* Right */}
      <div className="hidden lg:flex lg:flex-1 lg:justify-end text-[13px] space-x-3 _font-medium items-center text-[#999999]">
      
      {/* <Link href="/search">Search</Link> */}
      {/* {headerMenu?.menuItems.map((menuItem, key) => {
            return <CustomLink key={`menu-item-${key}`} data={menuItem} />
        }
      )} */}
      {user ? (
        <div className="space-x-4">
        <Link href="/dashboard">
        <Image
				src="/icon-bookmark-menu.svg"
				width={24}
				height={24}
				alt="Search"
			/>
      </Link>
        {/* <LogoutLink>Log out</LogoutLink> */}
        </div>
        ) : (
          <LoginLink>
              <Image
				src="/icon-bookmark-menu.svg"
				width={24}
				height={24}
				alt="Search"
			/>
          </LoginLink>
        )
      }
      <Link href="/search">
      <Image
				src="/icon-search.svg"
				width={24}
				height={24}
				alt="Search"
			/>
      </Link>
      {/* <Link href="/search">
      <Image
				src="/icon-bookmark-menu.svg"
				width={24}
				height={24}
				alt="Search"
			/>
      </Link> */}
      <MenuSidebar />
      </div>
    </nav>
  </header>
)
}
