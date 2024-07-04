export const revalidate = 60;
// import { draftMode } from "next/headers"
// import { LiveQuery } from "next-sanity/preview/live-query"
import { sanityFetch } from "@/lib/sanity.fetch"
import { formatMetaData } from "@/lib/utilities"

// import PreviewHomePageComponent from "@/components/PreviewHomePageComponent"
// import HomePageComponent, { query } from "@/components/HomePageComponent"
import OnDisplay from "@/components/blocks/OnDisplay"
import SiteTitleHeader from "@/components/SiteTitleHeader"
import BecomeAPatron from "../../components/BecomeAPatron"
import SellWithUs from "../../components/SellWithUs"
import ItemsRow from "@/components/ItemsRow"
import NewFonts from "@/components/NewFonts";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const query = `{
    "page": *[_type == "page" && _id == *[_type == "settings"][0].homePage->_id][0],
    "settings": *[_type == "settings"][0]
  }`;
  const data = await sanityFetch({ query, tags: ["page"] })
  const pageSeo = data.page?.seo ? data.page?.seo : null
  const siteSeo = data?.settings?.siteSeo ? data?.settings?.siteSeo : null

  return formatMetaData(siteSeo, pageSeo)
}

export function generateStaticParams() {
  return ["/"];
}

export default function IndexPage() {
  // const data = await sanityFetch({ query, tags: ["page"] })

  return (
    <>
    <SiteTitleHeader />
    <OnDisplay />

    <NewFonts secondrow={false} title="New fonts" />

    <section className="px-18 mt-40 mx-auto">
      <ItemsRow title="Fonts Gallery" />
    </section>
    <BecomeAPatron />
    {/* <SellWithUs /> */}
    </>
    // <HomePageComponent data={data} />

    // <LiveQuery
    //   enabled={draftMode().isEnabled}
    //   query={query}
    //   initialData={data}
    //   as={PreviewHomePageComponent}>
    //   <HomePageComponent data={data} />
    // </LiveQuery>

  //   <div className="aspect-[4/2.8] bg-md-grey-200 flex items-center">
  //   <h2 className="uppercase font-black text-[40px] mx-auto max-w-52 text-center tracking-[-1%] leading-[34px]">Become a Patron</h2>
  // </div>
  // <div>
  //   <h3 className="uppercase tracking-wide my-4">Create your favoourite content</h3>
  //   <div className="text-sm space-y-4">
  //   <p>As a patron, you can bookmark all your favorite content and have it neatly organized and categorized in one place. You can bookmark any content, including your favorite design studios, projects, foundries, fonts, interviews, job listings, or store items.</p>
  //   <p>Signing up for an entire year is 20% cheaper. You will also get 10% off on your first order and 50% off on a job listing.</p>
  //   </div>
  // </div>
  )
}
