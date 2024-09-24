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
        <div className="pt-60 pb-8"><SummaryCallout data={studios} /></div>
        <div className="flex uppercase text-xs tracking-[1%] items-center flex-col pb-32 text-md-grey-300">
            <div className="space-x-2">
            <span>View as</span>
            <button className="uppercase text-xs tracking-[1%]">List</button>
            <button className="uppercase text-xs tracking-[1%]">Grid</button>
            </div>
        </div>
        <HoverListing data={studios} sectionHeader=" " userBookmarks={userBookmarks} user={user} />
        <div className="py-40">
        <GridListing data={studios} title="Design Studios" limit={18} aspect="portrait" />
        </div>
    </main>
  );
}
