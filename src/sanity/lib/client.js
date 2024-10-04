const { createClient } = require("next-sanity");
const { draftMode } = require("next/headers");

const { apiVersion, dataset, projectId } = require("../env");
const { token } = require("./token");

export const client = createClient({
	projectId,
	dataset,
	apiVersion, // https://www.sanity.io/docs/api-versioning
	useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
	stega: {
		enabled: true,
		// enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === "preview",
		studioUrl: "/admin",
	},
});

export async function sanityFetch({
	query,
	params = {},
	revalidate = 60, // default revalidation time in seconds
	tags = [],
}) {
	const isDraftMode = draftMode().isEnabled;

	if (isDraftMode && !token) {
		throw new Error("Missing environment variable SANITY_READ_TOKEN");
	}

	let queryOptions = {};
	let maybeRevalidate = revalidate;

	if (isDraftMode) {
		queryOptions.token = token;
		queryOptions.perspective = "previewDrafts";
		queryOptions.stega = true;

		maybeRevalidate = 0; // Do not cache in Draft Mode
	} else if (tags.length) {
		maybeRevalidate = false; // Cache indefinitely if tags supplied
	}

	return client.fetch(query, params, {
		...queryOptions,
		next: {
			revalidate: maybeRevalidate,
			tags,
		},
	});
}
