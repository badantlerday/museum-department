export const revalidate = 120;

import { client } from "@/lib/sanity.client";
import StudioComponent, { query } from "@/components/StudioComponent";

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({ params, searchParams }, parent) {
  const { slug } = params;
  const data = await client.fetch(query, { slug });

  return {
    title: data.studio.name,
  };
}

//  (SSG) prerendered as static HTML
export async function generateStaticParams() {
  const queryAllStudios = `*[_type == "studio" ]`
  const studios = await client.fetch(queryAllStudios,{ next: { revalidate: 60 } });
 
  return studios.map((studio) => ({
    slug: studio.slug.current,
  }))
}

export default async function Studio({ params }) {
  const { slug } = params;
  const data = await client.fetch(query, { slug }); // Provide the value for $slug

  return (
    <StudioComponent data={data} />
  );
}
