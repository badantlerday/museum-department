import { sanityFetch } from "@/sanity/lib/client";
import {getAllPageTitles,getLatestProject} from "@/sanity/lib/queries";
import AnimatedLink from "@/components/AnimatedLink";
import Menu from "@/components/Menu";
import CurrentPageTitle from "@/components/CurrentPageTitle";
import dynamic from "next/dynamic";
const UserIcon = dynamic(() => import("@/components/UserIcon"));

export default async function Header() {
    // const allPageTitles = await sanityFetch({ query: getAllPageTitles })
    const latestProjects = await sanityFetch({ query: getLatestProject, tags: ["project"] })

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
                    {/* <CurrentPageTitle data={allPageTitles} /> */}
                </div>
            </div>
            {/* Right */}
            <div className="flex lg:flex-1 lg:justify-end text-[13px] space-x-2 items-center text-[#999999]">
            <UserIcon />
            <Menu projects={latestProjects} />
            </div>
          </nav>
        </header>
      )
}