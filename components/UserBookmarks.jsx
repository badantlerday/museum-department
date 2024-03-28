import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { createClient } from '@supabase/supabase-js'
import { client } from "@/lib/sanity.client";
import Link from "next/link";

export default async function UserBookmarks({ params }) {
  const {getUser,isAuthenticated} = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id) { // Updated check
    return <div>Please log in to view bookmarks.</div>;
  }
  
	// https://medium.com/creditas-tech/react-suspense-swr-skeleton-e1979e9f32f0

  	// Create a single supabase client for interacting with your database
	const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLIC_KEY)
	const bookmarks = await supabase.from('Bookmarks').select('*').eq('kinde_user_id', user.id)

	// Extracting just the IDs into a new array
	const documentIds = bookmarks.data.map(obj => obj.document_id);

	const bookmarkDocuments = await client.fetch(
		`*[_id in $documentIds] {
		  _id, title, name, slug, _type
		}`,
		{ documentIds } // Passing the array as a parameter
	  );

  return (
    <ul className="space-y-2">
    {bookmarkDocuments.map((bookmark) => (
      <li key={bookmark._id}>
        <Link href={`/${bookmark._type}/${bookmark.slug.current}`}>
        {bookmark.name}{bookmark.title} ({bookmark._type})
        </Link>
        </li>
    ))}
    </ul>
  );
}