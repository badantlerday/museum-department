"use server";
import { createClient } from "@supabase/supabase-js";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import querystring from "querystring";

// Spotify API setup
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

// Function to get Spotify access token
const getAccessToken = async () => {
	const response = await fetch(TOKEN_ENDPOINT, {
		method: "POST",
		headers: {
			Authorization: `Basic ${basic}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: querystring.stringify({
			grant_type: "refresh_token",
			refresh_token,
		}),
	});

	if (!response.ok) {
		throw new Error("Failed to retrieve Spotify access token");
	}

	return response.json();
};

export async function checkBookmark({ docid }) {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	const supabase = createClient(
		process.env.SUPABASE_URL,
		process.env.SUPABASE_PUBLIC_KEY
	);

	return await supabase
		.from("Bookmarks")
		.select("*")
		.eq("kinde_user_id", user.id)
		.eq("document_id", docid);
}

export async function addBookmark({ docid }) {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	const supabase = createClient(
		process.env.SUPABASE_URL,
		process.env.SUPABASE_PUBLIC_KEY
	);

	return await supabase
		.from("Bookmarks")
		.insert([{ kinde_user_id: user.id, document_id: docid }])
		.select();
}

export async function removeBookmark({ docid }) {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	const supabase = createClient(
		process.env.SUPABASE_URL,
		process.env.SUPABASE_PUBLIC_KEY
	);

	return await supabase
		.from("Bookmarks")
		.delete()
		.eq("kinde_user_id", user.id)
		.eq("document_id", docid);
}

export async function getUserBookmarks() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	// Return false if no user is found
	if (!user) {
		return false;
	}
	const supabase = createClient(
		process.env.SUPABASE_URL,
		process.env.SUPABASE_PUBLIC_KEY
	);

	const userBookmarks = await supabase
		.from("Bookmarks")
		.select("*")
		.eq("kinde_user_id", user.id);

	return {
		user,
		userBookmarks,
	};
}

// Function to fetch Spotify playlist data
export async function fetchPlaylistData(playlistUrl) {
	try {
		const { access_token } = await getAccessToken();
		// console.log("Access Token:", access_token);

		const playlistId = playlistUrl.split("playlist/")[1]?.split("?")[0];
		// console.log("Playlist ID:", playlistId);

		const PLAYLIST = `https://api.spotify.com/v1/playlists/${playlistId}?fields=name%2Cimages%2Ctracks(items(track(id,name%2Cartists%2Calbum(images))))`;
		// const PLAYLIST = `https://api.spotify.com/v1/playlists/${playlistId}?fields=name`;

		const playlistResponse = await fetch(PLAYLIST, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		if (!playlistResponse.ok) {
			console.error(
				"Failed to fetch playlist data:",
				playlistResponse.status,
				playlistResponse.statusText
			);
			throw new Error("Failed to fetch playlist data");
		}

		const data = await playlistResponse.json();
		// console.log("Playlist Data:", data);

		return data;
	} catch (error) {
		console.error("Internal Server Error:", error.message);
		throw new Error("Internal Server Error: " + error.message);
	}
}
