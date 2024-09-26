import { client } from "@/lib/sanity.client";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import BookmarkButton from "@/components/BookmarkButton";

const builder = imageUrlBuilder(client);

const FontCard = ({ item, layout = "small" }) => {
  const { _id, name, slug, mainImage, foundry } = item;
  
  const imageUrl = mainImage ? builder.image(mainImage).url() : null;
  const isLarge = layout === "large";
  const imageWidth = isLarge ? 1200 : 800;
  const imageHeight = isLarge ? 1200 : 665;

  const imageClass = `aspect-[4/3] _object-cover bg-md-grey-100 block px-24 mb-2 ${isLarge ? "w-full" : ""}`;
  const namePlaceholderClass = `text-center w-full font-black uppercase ${isLarge ? "text-5xl" : ""}`;
  const nameClass = `${isLarge ? "text-base" : "text-xs"} font-medium tracking-wide block uppercase`;
  const foundryClass = `${isLarge ? "text-base" : "text-xs"} font-medium italic block`;

  return (
    <div key={_id} className={isLarge ? "flex-1" : "py-1"}>
      <Link href={`/font/${slug?.current}`} className="block">
        {mainImage ? (
          
          <Image
            className={imageClass}
            src={imageUrl}
            width={imageWidth}
            height={imageHeight}
            unoptimized={mainImage?.asset?.extension === 'svg'}
            // blurDataURL={mainImage.asset.metadata.lqip}
            // placeholder="blur"
            alt={name}
          />
          
        ) : (
          <div className="w-full aspect-[4/3] bg-md-grey-100 flex items-center justify-center mb-2">
            <div className={namePlaceholderClass}>{name}</div>
          </div>
        )}
      </Link>
      <div className="flex">
        <div className="flex-1">
          <span className={nameClass}>
            <Link href={`/font/${slug?.current}`} className="hover:text-md-grey-500">
              {name}
            </Link>
          </span>
          {foundry && (
            <span className={foundryClass}>
              <Link href={`/foundry/${foundry.slug?.current}`} className="hover:text-md-grey-500">
                {foundry.name}
              </Link>
            </span>
          )}
        </div>
        <div>
          <BookmarkButton documentId={_id} variant="icon" message={name} />
        </div>
      </div>
    </div>
  );
};

export default async function NewFonts({ firstrow = true, secondrow = true, title = "Fonts" }) {
  const fonts = await client.fetch(`*[_type == "typeface"]{
    _id,
    name,
    slug,
    mainImage{ crop, hotspot, asset-> },
    foundry->{ name, slug },
  }`);

  return (
    <>
      {firstrow && (
        <section>
          <div className="mx-auto px-18 pt-48 pb-10">
            <h2 className="text-xl font-medium mb-4 capitalize">{title}</h2>
            <div className="grid grid-cols-2 gap-4">
              {fonts.slice(0, 2).map((item) => (
                <FontCard key={item._id} item={item} layout="large" />
              ))}
            </div>
          </div>
        </section>
      )}
      {secondrow && (
        <section>
          <div className="mx-auto px-16 py-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {fonts.slice(2, 6).map((item) => (
                <FontCard key={item._id} item={item} layout="small" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}