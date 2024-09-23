export const revalidate = 60;
import { sanityFetch } from "@/lib/sanity.fetch"
import { formatMetaData } from "@/lib/utilities"
import OnDisplay from "@/components/blocks/OnDisplay"
import SiteTitleHeader from "@/components/SiteTitleHeader"
import BecomeAPatron from "@/components/BecomeAPatron"
import ItemsRow from "@/components/ItemsRow"
import NewFonts from "@/components/NewFonts";
import FeaturedInterview from "@/components/FeaturedInterview"
import { getFontGalleryItems } from "@/lib/sanity.queries";

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

export default async function IndexPage() {
  const fontsGallery = await sanityFetch({ query: getFontGalleryItems, tags: ["project"] })

  return (
    <>
    <SiteTitleHeader />
    <OnDisplay />
    <FeaturedInterview />
    <NewFonts secondrow={false} title="New fonts" />
    <section className="px-18 mt-40 mx-auto">
      <ItemsRow title="Fonts Gallery" data={fontsGallery} link="/fonts-gallery" />
    </section>
    <BecomeAPatron />
    </>
  )
}
