// export const revalidate = 0
import { draftMode } from "next/headers"
import { LiveQuery } from "next-sanity/preview/live-query"
import { sanityFetch } from "@/lib/sanity.fetch"
import { notFound } from 'next/navigation'

import { formatMetaData } from "@/lib/utilities"

import PreviewPageComponent from "@/components/PreviewPageComponent"
import PageComponent, { query } from "@/components/PageComponent"

export async function generateMetadata({ params }) {
  const data = await sanityFetch({ query, params, tags: ["page"]})
  const pageSeo = data.page?.seo ? data.page?.seo : null
  const siteSeo = data?.settings?.siteSeo ? data?.settings?.siteSeo : null

  return formatMetaData(siteSeo, pageSeo)
}

export default async function IndexPage({ params }) {
  const data = await sanityFetch({ query, params, tags: ["page"] })

  if (!data.page) {
    notFound()
  }

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={query}
      params={params}
      initialData={data}
      as={PreviewPageComponent}>
      <PageComponent data={data} />
    </LiveQuery>
  )
}
