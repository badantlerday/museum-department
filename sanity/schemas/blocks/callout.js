import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

export default defineType({
	type: "object",
	name: "callout",
	title: "Callout",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
		}),
		defineField({
			name: "text",
			title: "Text",
			type: "text",
		}),
		defineField({
			name: "link",
			title: "Link",
			type: "string",
		}),
		defineField({
			name: "buttonText",
			title: "Button Text",
			type: "string",
		}),
	],
	icon: StarIcon,
	preview: {
		select: {
			title: "title",
			image: "image",
		},
		prepare({ title, image }) {
			return {
				title: title ? title : "Callout",
				subtitle: "Callout",
				media: image ? image : StarIcon,
			};
		},
	},
});
