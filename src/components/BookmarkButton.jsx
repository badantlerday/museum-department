import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { Suspense } from 'react';
import { checkBookmark } from "@/app/actions";
import Image from "next/image";
import Bookmark from "@/components/Bookmark";
import Link from "next/link";


export default async function BookmarkButton({ documentId,variant="text",message }) {
    // Could mode this to parent page
    const {getUser,isAuthenticated} = getKindeServerSession();
    // const user = await getUser();
    const isUserAuthenticated = await isAuthenticated();

    // Early return if user is not authenticated, prompting them to log in
    if (!isUserAuthenticated) {
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

    // Check if the document is bookmarked by the user
    const bookmark = await checkBookmark({ docid: documentId });
    const isBookmarked = bookmark.data.length > 0;

return (
    <Suspense fallback={
        <div>
            <svg width="10" height="15" alt="Remove bookmark" viewBox="0 0 10 15" fill="none" className="animate-pulse fill-md-grey-200" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 15L5 10.7531L10 15V0H0V15Z"/>
            </svg>
        </div>}>
        <Bookmark documentId={documentId} isBookmarked={isBookmarked} userid={isUserAuthenticated} variant={variant} message={message} />
    </Suspense>
  );

}