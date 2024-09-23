export const revalidate = 60;
import FontsInUseListing from '@/components/FontsInUseListing';
import { client } from "@/lib/sanity.client";
import { getFontsInUse } from "@/lib/sanity.queries";
import {getUserBookmarks} from "@/app/actions";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import GridListing from "@/components/GridListing";


export default async function FontsInUse() {
    const { user, userBookmarks } = await getUserBookmarks();
	const fonts = await client.fetch(getFontsInUse);

	return (
		<main className="mt-48">
            {/* <GridListing data={fonts} /> */}
		    <FontsInUseListing data={fonts} userBookmarks={userBookmarks} user={user} />
		</main>
	);
}
