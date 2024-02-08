
import imageUrlBuilder from "@sanity/image-url";

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

const builder = imageUrlBuilder({ projectId, dataset });

export const formatMetaData = (siteSeo, pageSeo) => {
    let title = `${pageSeo?.metaTitle} ${siteSeo?.separator} ${siteSeo?.title}`

    return {
        metadataBase: new URL('https://museumdepartment.com'),
        title: title,
        description: pageSeo?.metaDesc ? pageSeo.metaDesc : (siteSeo?.description ? siteSeo.description : ''),
        openGraph: {
          title: pageSeo?.shareTitle ? pageSeo.shareTitle : '',
          description: pageSeo?.shareDesc ? pageSeo.shareDesc : '',
          url: siteSeo?.baseUrl ? siteSeo.baseUrl : '',
          siteName: siteSeo?.title ? siteSeo.title : '',
          locale: siteSeo?.locale ? siteSeo.locale : '',
          type: 'website',
          images: pageSeo?.shareGraphic || siteSeo?.image ? [
            {
              url: pageSeo?.shareGraphic ? builder.image(pageSeo.shareGraphic).width(1200).height(675).quality(100).url() : (siteSeo?.image ? builder.image(siteSeo.image).width(1200).height(675).quality(100).url() : ''),
              width: 1200,
              height: 675,
            },
          ] : [],
        },
      };
}