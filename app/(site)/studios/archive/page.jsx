import { client } from "@/lib/sanity.client";
import { getPageDesignStudios } from "@/lib/sanity.queries";
import { getUserBookmarks } from "@/app/actions";
import StudiosArchive from "@/components/StudiosArchive";

export default async function StudiosArchivePage() {
  const {user,userBookmarks} = await getUserBookmarks();
  const { studios } = await client.fetch(getPageDesignStudios);

  return (
    <main>
      <StudiosArchive studios={studios} userBookmarks={userBookmarks} user={user} />
    </main>
  );
}

{/* <GridListing data={studios} title="Design Studios" limit={18} aspect="portrait" /> */}
