import { getPageHome } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/client";
import SiteTitleHeader from "@/components/SiteTitleHeader";
import MasonryGrid from "@/components/MasonryGrid";
import ItemsRow from "@/components/ItemsRow";
import FeaturedInterview from "@/components/FeaturedInterview";
import NewFonts from "@/components/NewFonts";
import BecomeAPatron from "@/components/BecomeAPatron";

export const metadata = {
	title: "On Display — Museum Department",
	description: "Curating Contemporary Culture.",
};

// // Force static generation
// export const dynamic = 'force-static'

// // Function to generate static params
// export async function generateStaticParams() {
//   return []
// }

export default async function Home() {
  // const fontsGallery = await sanityFetch({ query: getFontGalleryItems, tags: ["project"] })
  // const onDisplay = await sanityFetch({ query: getOnDisplay, tags: ["project"] })

  // const fontsGallery = await sanityFetch({ query: getFontGalleryItems })
  // const onDisplay = await sanityFetch({ query: getOnDisplay })
  const {onDisplay,fontsGallery} = await sanityFetch({ query: getPageHome })


    return (
      <>
        <SiteTitleHeader />
        <MasonryGrid data={onDisplay} />
        <FeaturedInterview />
        <NewFonts secondrow={false} title="New fonts" />
        <section className="px-18 mt-40 mx-auto">
        <ItemsRow title="Fonts Gallery" data={fontsGallery} link="/fonts-gallery" />
        </section>
        <BecomeAPatron />
      </>
    );
  }