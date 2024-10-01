import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";
import { media } from "sanity-plugin-media";

export default defineType({
	name: "media",
	title: "Media",
	type: "array",
	of: [
		{
			name: "images",
			title: "Images",
			type: "object",
			fields: [
				defineField({
					name: "image",
					title: "Image",
					type: "array",
					of: [
						{
							name: "item",
							title: "Item",
							type: "image",
							options: {
								hotspot: true,
							},
						},
					],
				}),
			],
			preview: {
				select: {
					image0: "item.0.image.",
				},
				prepare(selection) {
					// Customize the preview title to include the category name
					const { image0 } = selection;

					return {
						title: "Image Block",
						media: image0,
					};
				},
			},
		},
	],
	preview: {
		select: {
			image: "images.0.image.item.image",
		},
		prepare(selection) {
			// Customize the preview title to include the category name
			const { image0 } = selection;

			return {
				title: "Images",
				media: image,
			};
		},
	},
	icon: StarIcon,
});
