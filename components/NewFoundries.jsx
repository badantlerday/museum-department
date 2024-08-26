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

  const imageClass = `aspect-[4/3] object-cover ${isLarge ? "w-full mb-2" : ""}`;
  const namePlaceholderClass = `text-center w-full font-black uppercase ${isLarge ? "text-5xl" : ""}`;
  const nameClass = `${isLarge ? "text-base" : "text-xs"} font-medium tracking-wide block uppercase`;
  const foundryClass = `${isLarge ? "text-base" : "text-xs"} font-medium italic block`;

  return (
    <div key={_id} className={isLarge ? "flex-1" : "py-1"}>
      <Link href={`/foundry/${slug?.current}`} className="block">
        {mainImage ? (
          <Image
            className={imageClass}
            src={imageUrl}
            width={imageWidth}
            height={imageHeight}
            blurDataURL={mainImage.asset.metadata.lqip}
            placeholder="blur"
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
            <Link href={`/foundry/${slug?.current}`} className="hover:text-md-grey-500">
              {name}
            </Link>
          </span>
          
          <span className={foundryClass}>
            {item.location?.[0] && (
              <>
                <Link
                  href={`/reference/${item.location[0].slug.current}`}
                  className="hover:text-md-grey-500"
                >
                  {item.location[0].name}
                </Link>
                ,{' '}
                {item.location[0].country && (
                  <Link
                    href={`/reference/${item.location[0].country.slug.current}`}
                    className="hover:text-md-grey-500"
                  >
                    {item.location[0].country.name}
                  </Link>
                )}
              </>
            )}
          </span>
          
        </div>
        <div>
          <BookmarkButton documentId={_id} variant="icon" message={name} />
        </div>
      </div>
    </div>
  );
};

export default async function NewFoundries({ firstrow = true, secondrow = true, title = "Header" }) {
  const items = await client.fetch(`*[_type == "foundry"]{
    _id,
    name,
    slug,
    _type,
    mainImage{ crop, hotspot, asset-> },
    location[]->{
		_id,name,_type,slug,country->{name,slug,_type}
	  },
  }`);

  return (
    <>
      {firstrow && (
        <section>
          <div className="mx-auto px-18 pt-48 pb-10">
            <h2 className="text-xl font-medium mb-4 capitalize">{title}</h2>
            <div className="grid grid-cols-2 gap-4">
              {items.slice(0, 2).map((item) => (
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
              {items.slice(2, 6).map((item) => (
                <FontCard key={item._id} item={item} layout="small" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}