import { defineField, defineType } from "sanity";
import { DocumentIcon, TagIcon } from "@sanity/icons";

export default defineType({
	name: "category",
	title: "Category",
	type: "document",
	icon: TagIcon,
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
			name: "connection",
			title: "Connect category to",
			description: "For a better seperation of categories here in the backend",
			type: "array",
			group: "content",
			of: [{ type: "string" }],
			options: {
				layout: "grid",
				list: [
					{ title: "Studio", value: "studio" },
					{ title: "Project", value: "project" },
				],
			},
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
				// subtitle: `/${slug.current}`,
			};
		},
	},
});
