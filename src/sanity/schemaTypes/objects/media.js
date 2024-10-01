import { ImageIcon } from "@sanity/icons";

import { defineField, defineType } from "sanity";
export default defineType({
	title: "Media",
	name: "media",
	type: "object",
	//   options: {
	//     collapsible: true,
	//     collapsed: true,
	//   },
	fields: [
		{
			name: "type",
			title: "Media type",
			type: "string",
			options: {
				list: [
					{
						title: "Image",
						value: "image",
					},
					{
						title: "Video",
						value: "video",
					},
				],
				layout: "radio",
				direction: "horizontal",
			},
			initialValue: "image",
		},
		// {
		//   name: "videoId",
		//   title: "Video ID",
		//   type: "string",
		//   hidden: ({ parent }) => parent?.type !== "video",
		// },
		// {
		//   title: "Autoplay video?",
		//   name: "videoAutoPlay",
		//   type: "boolean",
		//   initialValue: true,
		//   hidden: ({ parent }) => parent?.type !== "video",
		// },
		{
			name: "image",
			title: "Image",
			type: "image",
			//   description: "If type is video this is used as a placeholder.",
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: "alt",
					title: "Alt text",
					type: "string",
					validation: (Rule) => Rule.required(),
				},
			],
		},
	],
	icon: ImageIcon,
	preview: {
		select: {
			image: "image",
			description: "image.alt",
			type: "type",
		},
		prepare({ image, type, description }) {
			return {
				title: description ? description : "Media",
				subtitle: "Media",
				media: image ? image : ImageIcon,
			};
		},
	},
});
