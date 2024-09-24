export const revalidate = 60;
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import TextCallout from "@/components/TextCallout";
import { client } from "@/lib/sanity.client";
// import Counter from "@/components/Counter"
import NewStudios from "@/components/NewStudios";
import HoverListing from "@/components/HoverListing";
import SummaryCallout from "@/components/SummaryCallout";
import { getPageDesignStudios } from "@/lib/sanity.queries";
import { getUserBookmarks } from "@/app/actions";
import GridListing from "@/components/GridListing";

export default async function StudiosArchive() {
  // const { getUser } = getKindeServerSession();
	// const user = await getUser();
  const {user,userBookmarks} = await getUserBookmarks();
  const { studios } = await client.fetch(getPageDesignStudios);
  

  return (
    <main>
        <div className="pt-60 pb-32"><SummaryCallout data={studios} /></div>
        <HoverListing data={studios} sectionHeader="Design Studios" userBookmarks={userBookmarks} user={user} />
    </main>
  );
}
