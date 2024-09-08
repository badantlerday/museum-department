import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

export default defineType({
	name: "slideshow",
	title: "Slideshow",
	type: "object",
	fields: [
		{
			name: "images",
			title: "Images",
			type: "array",
			of: [
				defineField({
					name: "Image",
					title: "Image",
					type: "image",
					options: {
						hotspot: true,
					},
				}),
			],
		},
	],
	icon: StarIcon,
	preview: {
		prepare() {
			return {
				title: "Slideshow",
			};
		},
	},
});
