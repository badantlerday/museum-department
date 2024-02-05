import { draftMode } from "next/headers"
import { LiveQuery } from "next-sanity/preview/live-query"
import { sanityFetch } from "@/lib/sanity.fetch"

import { formatMetaData } from "@/lib/utilities"

import PreviewHomePageComponent from "@/components/PreviewHomePageComponent"
import HomePageComponent, { query } from "@/components/HomePageComponent"

export async function generateMetadata({ params }) {
  const data = await sanityFetch({ query, tags: ["page"] })
  const pageSeo = data.page?.seo ? data.page?.seo : null
  const siteSeo = data?.settings?.siteSeo ? data?.settings?.siteSeo : null

  return formatMetaData(siteSeo, pageSeo)
}

export default async function IndexPage() {
  const data = await sanityFetch({ query, tags: ["page"] })

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={query}
      initialData={data}
      as={PreviewHomePageComponent}>
      <HomePageComponent data={data} />
    </LiveQuery>
  )
}
