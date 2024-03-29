/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
			},
		],
	},
	experimental: {
		taint: true,
	},
	// logging: {
	// 	fetches: {
	// 		fullUrl: true,
	// 	},
	// },
	// ...other config settings
};

module.exports = nextConfig;
