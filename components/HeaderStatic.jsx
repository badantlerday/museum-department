import { client } from "@/lib/sanity.client";
import { sanityFetch } from "@/lib/sanity.fetch"
import AnimatedLink from "@/components/AnimatedLink"
import MenuSidebar from "@/components/MenuSidebar";
import MenuBig from "@/components/MenuBig";
import CurrentPageHeader from "@/components/CurrentPageHeader";
import dynamic from "next/dynamic";
const UserSession = dynamic(() => import("@/components/UserSession"));

export default async function HeaderStatic() {

    const queryPageTitles = `*[_type in ["project","studio","typeface","foundry","interview","city","country","person","category"]]{
        _type,
        title,
        name,
        slug,
    }`;
    const allPageTitles = await sanityFetch({ query: queryPageTitles, tags: ["project"] })

    const latestProjects = await client.fetch(`*[_type == "project"] | order(_createdAt desc)[0]{
        _id,
        title,
        slug,
        mainImage{crop,hotspot,asset->},
        mainVideo,
        studio->{name},
    }`);


    return (
        <header className="_fixed top-0 left-0 w-full z-50 bg-white">
          <nav className="flex items-center justify-between py-6 px-4 lg:px-18" aria-label="Global">
            {/* Left */}
            <div className="lg:flex-1 items-center">
              <div className="flex">
               <AnimatedLink text="Museum Department" hoverText="Curating Contemporary Culture" url="/" />
              </div>
            </div>
            {/* Center */}
            <div className="hidden lg:flex lg:gap-x-12 text-sm">
                <div className="flex lg:flex-1 space-x-4 items-center">
                    <CurrentPageHeader data={allPageTitles} />
                </div>
            </div>
            {/* Right */}
            <div className="flex lg:flex-1 lg:justify-end text-[13px] space-x-2 items-center text-[#999999]">
            <UserSession />
            <MenuBig projects={latestProjects} />
            </div>
          </nav>
        </header>
      )
}