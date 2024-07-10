export const revalidate = 60;
import FontsInUseListing from '@/components/FontsInUseListing';
import { client } from "@/lib/sanity.client";


export default async function FontsInUse() {

	const fonts = await client.fetch(`*[_type == "project" && defined(fontsInUse)] {
        _id, 
        title, 
        slug,
		publishedAt, 
        studio->{name,slug}, 
        fontsInUse[]->{name,_id,slug},
        posterImage{crop,hotspot,asset->},
    }`);

	return (
		<main className="mt-48">
		<FontsInUseListing data={fonts} />
		</main>
	);
}
