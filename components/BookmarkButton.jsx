import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { createClient } from '@supabase/supabase-js'
// import AddBookmarkLink from "./AddBookmarkLink";
// import RemoveBookmarkLink from "./RemoveBookmarkLink";
import Image from "next/image";
import Bookmark from "./Bookmark";
import Link from "next/link";

export default async function BookmarkButton({ documentId,variant="text" }) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    // Early return if user is not authenticated, prompting them to log in
    if (!user) {
        return (
            <Link href="/become-a-patron" className="flex gap-2">
                <Image
                    src="/icon-bookmark.svg"
                    width={10}
                    height={15}
                    alt="Become a patron to bookmark"
                />
                {/* Sign in to bookmark */}
            {/* Sign to bookmark */}
         </Link>
        )
    }

    // Create a single supabase client for interacting with your database
	const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLIC_KEY)
	const bookmark = await supabase.from('Bookmarks').select('*').eq('kinde_user_id', user.id).eq('document_id', documentId)
    // Check if the document is bookmarked by the user
    const isBookmarked = bookmark.data.length > 0;
    // console.log(bookmark.data)

return (
        <Bookmark documentId={documentId} isBookmarked={isBookmarked} userid={user.id} variant={variant} />
  );

}