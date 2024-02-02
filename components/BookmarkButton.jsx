import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { createClient } from '@supabase/supabase-js'
import { client } from "../sanity/lib/client";
import AddBookmarkLink from "./AddBookmarkLink";
import RemoveBookmarkLink from "./RemoveBookmarkLink";

export default async function BookmarkButton({ documentId }) {
    const {getUser,isAuthenticated} = getKindeServerSession();
    const user = await getUser();

    // Create a single supabase client for interacting with your database
	const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLIC_KEY)
	const bookmark = await supabase.from('Bookmarks').select('*').eq('kinde_user_id', user.id).eq('document_id', documentId)
    // Check if the document is bookmarked by the user
    const isBookmarked = bookmark.data.length > 0;
    // console.log(bookmark.data)

return (
    <div>
        {isBookmarked ? (
            <RemoveBookmarkLink documentId={documentId} />
        ) : (
            <AddBookmarkLink documentId={documentId} />
        )}
    </div>
  );

}