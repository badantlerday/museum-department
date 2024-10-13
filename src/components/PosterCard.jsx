import BookmarkButtonClient from "@/components/BookmarkButtonClient";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export default function Postercard({ data, aspect, columns, userBookmarks, user }) {
  const { item } = data || {};
  const aspectRatio = aspect === "landscape" ? "aspect-[4/3]" : "aspect-[3/4]";

  // Determine text size based on columns prop
  // Define text size object with different sizes for header and text
  const textSize = columns.includes("grid-cols-6")
    ? { header: "text-xs uppercase tracking-wider", text: "text-xs" }
    : { header: "text-base", text: "text-base" };

    const renderImage = (imageSrc, altText, documentType) => {
      return imageSrc && documentType === 'typeface' ? (
        <Image
          className={`${aspectRatio} mb-2 bg-md-grey-100 px-8 opacity-70`}
          // src={builder.image(imageSrc).width(500).url()}
          src={urlFor(imageSrc).width(500).url()}
          width={800}
          height={665}
          unoptimized
          alt={altText}
        />
      ) : imageSrc ? (
        <Image
          className={`${aspectRatio} mb-2 object-cover`}
          // src={builder.image(imageSrc).width(1000).url()}
          src={urlFor(imageSrc).width(1000).url()}
          width={800}
          height={665}
          blurDataURL={imageSrc?.asset.metadata.lqip}
          placeholder="blur"
          alt={altText}
        />
      ) : (
        <div className={`${aspectRatio} w-full bg-md-grey-100 mb-2`}></div>
      );
    };

  const renderDetails = (
    mainLink,
    mainText,
    cityLink,
    cityText,
    countryLink,
    countryText,
    studioLink,
    studioText,
  ) => (
    <div className="flex">
      <div className={`flex-1`}>
        <Link href={mainLink} className="hover:text-md-grey-500">
          <span className={`font-medium block pr-1 ${textSize.header}`}>
            {mainText}
          </span>
        </Link>
        {cityLink && countryLink && (
          <span className={`font-medium block italic ${textSize.text}`}>
            <Link href={cityLink} className="hover:text-md-grey-500">
              {cityText}
            </Link>
            ,{" "}
            <Link href={countryLink} className="hover:text-md-grey-500">
              {countryText}
            </Link>
          </span>
        )}
        {studioLink && (
          <span className={`font-medium block italic ${textSize.text}`}>
            <Link href={studioLink} className="hover:text-md-grey-500">
              {studioText}
            </Link>
          </span>
        )}
      </div>
      <div>
        <BookmarkButtonClient
          documentId={item._id}
          variant="icon"
          message={mainText}
          userBookmarks={userBookmarks}
          user={user}
        />
      </div>
    </div>
  );

  if (!item) return null;

  let content = null;

  switch (item._type) {
    case "project":
      content = (
        <>
          <Link href={`/projects/${item.slug.current}`}>
            {renderImage(item.posterImage, item.name)}
          </Link>
          {renderDetails(
            `/projects/${item.slug.current}`,
            item.title,
            null,
            null,
            null,
            null,
            item.studio.slug?.current
              ? `/studios/${item.studio.slug.current}`
              : null,
            item.studio.name,
          )}
        </>
      );
      break;
    case "studio":
      content = (
        <>
          <Link href={`/studios/${item.slug.current}`}>
            {renderImage(item.posterImage, item.name)}
          </Link>
          {renderDetails(
            `/studios/${item.slug.current}`,
            item.name,
            item.location?.[0]?.slug?.current
              ? `/reference/${item.location[0].slug.current}`
              : null,
            item.location?.[0]?.name,
            item.location?.[0]?.country?.slug?.current
              ? `/reference/${item.location[0].country.slug.current}`
              : null,
            item.location?.[0]?.country?.name,
          )}
        </>
      );
    break;
    case "interview":
      content = (
        <>
          <Link href={`/interviews/${item.slug.current}`}>
            {renderImage(item.posterImage, item.title)}
          </Link>
          {renderDetails(
            `/interviews/${item.studio.slug.current}`,
            item.studio.name,
            item.studio.location?.[0]?.slug?.current
              ? `/reference/${item.studio.location[0].slug.current}`
              : null,
            item.studio.location?.[0]?.name,
            item.studio.location?.[0]?.country?.slug?.current
              ? `/reference/${item.studio.location[0].country.slug.current}`
              : null,
            item.studio.location?.[0]?.country?.name,
          )}
        </>
      );
    break;
    case "foundry":
      content = (
        <>
          <Link href={`/foundry/${item.slug.current}`}>
            {renderImage(item.posterImage, item.name)}
          </Link>
          {renderDetails(
            `/foundry/${item.slug.current}`,
            item.name,
            item.location?.[0]?.slug?.current
              ? `/reference/${item.location[0].slug.current}`
              : null,
            item.location?.[0]?.name,
            item.location?.[0]?.country?.slug?.current
              ? `/reference/${item.location[0].country.slug.current}`
              : null,
            item.location?.[0]?.country?.name,
          )}
        </>
      );
      break;
    case "typeface":
        content = (
          <>
            <Link href={`/font/${item.slug.current}`}>
              {renderImage(item.posterImage, item.name, item._type)}
            </Link>
            {renderDetails(
            `/font/${item.slug.current}`,
            item.name,
            null,
            null,
            null,
            null,
            item.foundry.slug?.current
              ? `/foundry/${item.foundry.slug.current}`
              : null,
            item.foundry.name,
          )}
          </>
        );
        break;
    default:
      if (item.foundry) {
        content = (
          <>
            <Link href={`/font/${item.slug.current}`}>
              {renderImage(item.posterImage, item.name)}
            </Link>
            {renderDetails(
              `/projects/${item.slug.current}`,
              item.name,
              item.location?.[0]?.slug?.current
                ? `/reference/${item.location[0].slug.current}`
                : null,
              item.location?.[0]?.name,
              item.location?.[0]?.country?.slug?.current
                ? `/reference/${item.location[0].country.slug.current}`
                : null,
              item.location?.[0]?.country?.name,
            )}
          </>
        );
      }
  }

  return (
    <div key={item._id} className="relative group">
      {content}
    </div>
  );
}
