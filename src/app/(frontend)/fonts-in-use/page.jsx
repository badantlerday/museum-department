import FontsInUseListing from '@/components/FontsInUseListing';
import { client } from "@/sanity/lib/client";
import { getFontsInUse } from "@/sanity/lib/queries";
import {getUserBookmarks} from "@/app/actions";

export default async function FontsInUse() {
    const { user, userBookmarks } = await getUserBookmarks();
	const fonts = await client.fetch(getFontsInUse);

	return (
		<main className="mt-48 pt-[35px]">
		    <FontsInUseListing data={fonts} userBookmarks={userBookmarks} user={user} />
		</main>
	);
}
