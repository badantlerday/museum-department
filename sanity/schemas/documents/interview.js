import { defineField, defineType } from "sanity";
import { CommentIcon } from "@sanity/icons";
export default defineType({
	name: "interview",
	title: "Interview",
	type: "document",
	icon: CommentIcon,
	groups: [
		{ title: "Information", name: "information", default: true },
		{ title: "Media", name: "media" },
		{ title: "Index", name: "index" },
	],
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
			group: "information",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			group: "information",
			options: {
				source: "title",
				maxLength: 96,
			},
		},
		{
			title: "Studio",
			name: "studio",
			type: "reference",
			group: "information",
			to: [{ type: "studio" }],
			weak: false,
			options: {
				disableNew: true,
			},
		},
		{
			title: "Excerpt",
			name: "excerpt",
			type: "text",
			group: "information",
		},
		{
			name: "posterImage",
			title: "Poster image",
			type: "image",
			group: "media",
			options: {
				hotspot: true,
			},
		},
		{
			name: "body",
			title: "Body",
			type: "blockContent",
			group: "information",
		},
		defineField({
			title: "Index",
			name: "index",
			type: "array",
			group: "index",
			of: [
				{
					title: "Refrence",
					type: "object",
					fields: [
						{
							title: "Text",
							name: "text",
							type: "string",
						},
					],
				},
			],
		}),
	],

	preview: {
		select: {
			title: "title",
			studioName: "studio.name",
		},
		prepare(selection) {
			// Customize the preview title to include the category name
			const { title, studioName } = selection;
			return {
				title: title,
				subtitle: studioName ? `${studioName}` : "No studio connected",
			};
		},
	},
});
