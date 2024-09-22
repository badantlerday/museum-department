export const revalidate = 60;
import { client } from "@/lib/sanity.client";
// import FontsGalleryGrid from "@/components/FontsGalleryGrid";
// import HighlightsFonts from "@/components/HighlightsFonts";
import TextCallout from "@/components/TextCallout";
import { NewTypeFoundries } from "@/components/TypeFoundries";
import NewFonts from "@/components/NewFonts";
import HoverListing from "@/components/HoverListing";
import MasonryGridLeftRight from "@/components/MasonryGridLeftRight";
import SectionHeader from "@/components/SectionHeader";
import NewFoundries from "@/components/NewFoundries";
import { getTypefaces, getFontsInUse } from "@/lib/sanity.queries";

export default async function FontsGallery() {
  const fontsinuse = await client.fetch(getFontsInUse);
  const typefaces = await client.fetch(getTypefaces);

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
      </section>
      {/* <NewTypeFoundries /> */}
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
      <HoverListing data={typefaces} sectionHeader="Fonts + Foundries" />
    </>
  );
}
