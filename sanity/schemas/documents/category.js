import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
	name: "category",
	title: "Category",
	type: "document",
	icon: DocumentIcon,
	groups: [
		{ title: "Content", name: "content", default: true },
		{ title: "SEO", name: "seo" },
	],
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			group: "content",
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			group: "content",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: "SEO / Share Settings",
			name: "seo",
			type: "seo",
			group: "seo",
		}),
	],
	preview: {
		select: {
			title: "title",
			slug: "slug",
		},
		prepare({ title, slug }) {
			return {
				title: title,
				subtitle: `/${slug.current}`,
			};
		},
	},
});
