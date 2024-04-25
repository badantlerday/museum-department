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
    <section className="px-16 mx-auto">
      <ItemsRow title="Fonts Gallery" />
    </section>
    <section className="px-16 mx-auto grid-cols-2 gap-32">
      <div>
        dsdsd
      </div>
      <div>
        asdasd
      </div>

    </section>
    {/* <BecomeAPatron /> */}
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
  )
}
