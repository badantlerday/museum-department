/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
			},
			{
				protocol: "https",
				hostname: "**.scdn.co",
			},
			{
				protocol: "https",
				hostname: "**.spotifycdn.com",
			},
		],
	},
	experimental: {
		taint: true,
	},
	// logging: {
	// 	fetches: {
	// 		fullUrl: false,
	// 	},
	// },
};

export default nextConfig;
