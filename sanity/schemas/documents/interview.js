import { CommentIcon } from "@sanity/icons";
export const interview = {
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
			name: "body",
			title: "Body",
			type: "blockContent",
		},
	],

	preview: {
		select: {
			title: "title",
		},
	},
};
