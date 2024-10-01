import querystring from "querystring";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

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

	return response.json();
};

// Named export for the GET method
export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const playlistUrl = searchParams.get("playlistUrl");

		if (!playlistUrl) {
			return new Response(JSON.stringify({ error: "Missing playlistUrl" }), {
				status: 400,
			});
		}

		const { access_token } = await getAccessToken();

		const playlistId = playlistUrl.split("playlist/")[1].split("?")[0];
		const PLAYLIST = `https://api.spotify.com/v1/playlists/${playlistId}?fields=name%2Cimages%2Ctracks(items(track(id,name%2Cartists%2Calbum(images))))`;

		const playlistResponse = await fetch(PLAYLIST, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		if (!playlistResponse.ok) {
			return new Response(
				JSON.stringify({ error: "Failed to fetch playlist data" }),
				{ status: playlistResponse.status }
			);
		}

		const playlistData = await playlistResponse.json();
		return new Response(JSON.stringify(playlistData), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
		});
	}
}
