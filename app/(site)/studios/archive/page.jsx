import { client } from "@/lib/sanity.client";
import { getStudios } from "@/lib/sanity.queries";
import { getUserBookmarks } from "@/app/actions";
import StudiosArchive from "@/components/StudiosArchive";

export default async function StudiosArchivePage() {
  const {user,userBookmarks} = await getUserBookmarks();
  const studios  = await client.fetch(getStudios);

  return (
    <main>
      <StudiosArchive studios={studios} userBookmarks={userBookmarks} user={user} />
    </main>
  );
}
