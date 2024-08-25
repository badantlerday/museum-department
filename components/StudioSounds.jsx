import Image from "next/image";
import Link from "next/link";
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
// https://open.spotify.com/playlist/0wLEFxqsndDHRURZmQCsZw?si=9a5cc37558be4538
export const getPlaylist = async (playlistUrl) => {
	const { access_token } = await getAccessToken();

	// Extracting the playlist ID from the URL
	const playlistId = playlistUrl.split("playlist/")[1].split("?")[0];

	// const PLAYLIST = `https://api.spotify.com/v1/playlists/${playlistId}?fields=name%2Cimages%2Ctracks`;
	const PLAYLIST = `https://api.spotify.com/v1/playlists/${playlistId}?fields=name%2Cimages%2Ctracks(items(track(id,name%2Cartists%2Calbum(images))))`;

	return fetch(PLAYLIST, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
};

export default async function StudioSounds({ playlistUrl }) {
	const playlistData = await getPlaylist(playlistUrl);
	const { name, images, tracks } = await playlistData.json();

	return (
		<>
			<section className="px-4 lg:px-20 mx-auto mb-32">
				<div className="border-t border-[#E6E6E6] pt-6 pb-4 grid grid-cols-2">
					<div className="flex flex-col  aspect-square">
						<div className=" flex-auto text-xl font-medium ">
							<h2 className="">Studio Sounds</h2>
							<div className="italic text-2xl">{name.includes("Studio Sounds -") ? name.replace("Studio Sounds -", "") : name}</div>
						</div>
						<div className="justify-self-end">
							<ul className="mb-6 text-xl space-y-1 font-medium">
								{tracks.items?.map((item) => (
									<li key={item.track.id}>
										{item.track.artists[0].name} - <span className="italic">{item.track.name}</span>
									</li>
								))}
							</ul>
							<Link
								href={playlistUrl}
								className="inline-block border border-md-black p-3 text-xs uppercase tracking-[10%]"
							>
								<div className="flex">
									<Image
										src="/icon_spotify.svg"
										width={13}
										height={13}
										className="mr-2"
										alt="Cover"
									/>
									<span>Listen</span>
								</div>
							</Link>
						</div>
					</div>
					<div className="aspect-square relative">
						<Image
							src={images[0].url}
							alt={name}
							className=" object-cover aspect-square"
							width={640}
							height={640}
						/>
					</div>
				</div>
			</section>
		</>
	);
}
