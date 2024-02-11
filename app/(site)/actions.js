"use server";
import { createClient } from "@supabase/supabase-js";

export async function addBookmark({ userid, docid }) {
	const supabase = createClient(
		process.env.SUPABASE_URL,
		process.env.SUPABASE_PUBLIC_KEY
	);

	return await supabase
		.from("Bookmarks")
		.insert([{ kinde_user_id: userid, document_id: docid }])
		.select();
}

export async function removeBookmark({ userid, docid }) {
	const supabase = createClient(
		process.env.SUPABASE_URL,
		process.env.SUPABASE_PUBLIC_KEY
	);

	return await supabase
		.from("Bookmarks")
		.delete()
		.eq("kinde_user_id", userid)
		.eq("document_id", docid);
}
