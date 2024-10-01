import { sanityFetch } from "@/sanity/lib/client"
import { getPageFontsGallery } from "@/sanity/lib/queries";
import { getUserBookmarks } from "@/app/actions";
import TextCallout from "@/components/TextCallout";
import NewFonts from "@/components/NewFonts";
import HoverListing from "@/components/HoverListing";
import MasonryGridLeftRight from "@/components/MasonryGridLeftRight";
import SectionHeader from "@/components/SectionHeader";
import NewFoundries from "@/components/NewFoundries";
import Button from "@/components/Button";

export default async function FontsGallery() {
  const {user, userBookmarks} = await getUserBookmarks();
  const {fontsinuse,typefaces} = await sanityFetch({ query: getPageFontsGallery, tags: ["project","typeface"] })

  const title = "Fonts Gallery";
  const text = (
    <p>
      Explore the dynamic interplay between typefaces and real-world design. Our
      archive shines a spotlight on the nuances and bold choices in typography
      today. As we progressively expand our archive, we`&apos;`re keenly focused
      on highlighting font foundries and the innovative ways their typefaces
      feature in design projects.
    </p>
  );

  return (
    <>
      <NewFonts />
      <section className="py-60">
        <div className="px-18 mx-auto">
          <SectionHeader title="Fonts in Use" border={false} />
        </div>
        <MasonryGridLeftRight data={fontsinuse} />
        <div className="flex items-center flex-col">
        <Button href="/fonts-in-use">View all in use</Button>
        </div>
      </section>
      <NewFoundries title="Type Foundries" />
      <section className=" py-60">
        <TextCallout
          title={title}
          text={text}
          button={true}
          buttonLink="/"
          buttonText="SUBMIT A TYPE PROJECT"
        />
      </section>
      <HoverListing data={typefaces} sectionHeader="Fonts + Foundries" userBookmarks={userBookmarks} user={user} />
    </>
  );
}
