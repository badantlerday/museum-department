import {sanityFetch} from "@/sanity/lib/client";
import {getStudios} from "@/sanity/lib/queries";
import { getUserBookmarks } from "@/app/actions";
import StudiosArchive from "@/components/StudiosArchive";

export default async function StudiosArchivePage() {
    const {user,userBookmarks} = await getUserBookmarks();
    const studios = await sanityFetch({ query: getStudios, tags: ["studio",] })
    // console.log(studios)
  
    return (
      <main>
        <StudiosArchive studios={studios} userBookmarks={userBookmarks} user={user} />
      </main>
    );
  }