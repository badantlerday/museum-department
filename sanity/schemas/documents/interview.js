import { defineField, defineType } from "sanity";
import { CommentIcon } from "@sanity/icons";
export default defineType({
	name: "interview",
	title: "Interview",
	type: "document",
	icon: CommentIcon,
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
		},
		{
			title: "Studio",
			name: "studio",
			type: "reference",
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
		},
		{
			name: "posterImage",
			title: "Poster image",
			type: "image",
			options: {
				hotspot: true,
			},
		},
		{
			name: "body",
			title: "Body",
			type: "blockContent",
		},
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
