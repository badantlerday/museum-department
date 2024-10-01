// https://www.sanity.io/schemas/internal-external-link-3f4a9c84
import { defineField, defineType } from "sanity";

export default defineType({
	name: "customUrl",
	title: "Custom URL",
	type: "object",
	fields: [
		defineField({
			name: "external",
			type: "url",
			title: "URL",
			hidden: ({ parent, value }) => !value && !!parent?.internal,
		}),
		defineField({
			name: "internal",
			type: "reference",
			to: [{ type: "page" }, { type: "project" }, { type: "studio" }],
			hidden: ({ parent, value }) => !value && !!parent?.external,
		}),
	],
});
