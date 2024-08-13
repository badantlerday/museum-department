export const revalidate = 60;
import FontsInUseListing from '@/components/FontsInUseListing';
import { client } from "@/lib/sanity.client";
import GridListing from "@/components/GridListing";


export default async function FontsInUse() {

	const fonts = await client.fetch(`*[_type == "project" && defined(fontsInUse)] {
        _id, 
        title, 
        slug,
        _type,
		publishedAt, 
        studio->{name,slug}, 
        fontsInUse[]->{name,_id,slug},
        posterImage{crop,hotspot,asset->},
    }`);

	return (
		<main className="mt-48">
            {/* <GridListing data={fonts} /> */}
		    <FontsInUseListing data={fonts} />
		</main>
	);
}
