import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

export default defineType({
	type: "object",
	name: "becomeasupporter",
	title: "Become a Supporter",
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
	],
	icon: StarIcon,
	preview: {
		select: {
			title: "title",
			image: "image",
		},
		prepare({ title, image }) {
			return {
				title: title ? title : "Become a Supporter",
				subtitle: "Become a Supporter",
				media: image ? image : StarIcon,
			};
		},
	},
});
