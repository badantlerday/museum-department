import BookmarkButtonClient from "@/components/BookmarkButtonClient";
import { getUserBookmarks } from "@/app/actions";
import { getStudios } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/client";

export default async function StudioList() {
    const {user,userBookmarks} = await getUserBookmarks();
    const studios = await sanityFetch({ query: getStudios })
    
    return (
        <div className="px-18 max-w-4xl mx-auto">
            <ul className="space-y-4">
                {studios.map((item) => (
                    <li key={item._id} className="flex space-x-2">
                        <BookmarkButtonClient
                            documentId={item._id}
                            variant="icon"
                            userBookmarks={userBookmarks}
                            user={user}
                            message={item.name}
                        />
                        <h2>{item.name}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
}
