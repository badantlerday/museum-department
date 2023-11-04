import { ImagesIcon } from "@sanity/icons";

export const project = {
	name: "project",
	title: "Project",
	type: "document",
	icon: ImagesIcon,
	groups: [
		{
			name: "content",
			title: "Content",
			default: true,
		},
		{
			name: "seo",
			title: "SEO",
		},
	],
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
			name: "publishedAt",
			title: "Published at",
			type: "datetime",
		},
		{
			name: "year",
			title: "Year",
			type: "number",
		},
		{
			title: "Studio",
			name: "studio",
			type: "reference",
			to: [{ type: "studio" }],
			weak: true,
			options: {
				disableNew: true,
			},
		},
		// {
		// 	title: "Fonts in Use",
		// 	name: "fontsInUse",
		// 	type: "array",
		// 	of: [
		// 		{
		// 			type: "object",
		// 			fields: [
		// 				{
		// 					title: "Image",
		// 					name: "image",
		// 					type: "image", // Assuming you want to store an image.
		// 					options: {
		// 						hotspot: true, // You can configure image options as needed.
		// 					},
		// 				},
		// 				{
		// 					title: "Typeface",
		// 					name: "typeface",
		// 					type: "reference",
		// 					to: [{ type: "typeface" }],
		// 					options: {
		// 						disableNew: true,
		// 					},
		// 				},
		// 			],
		// 		},
		// 	],
		// 	options: {
		// 		layout: "list",
		// 	},
		// },

		{
			title: "Fonts in Use",
			name: "fontsInUse",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "typeface" }],
					options: {
						disableNew: true,
					},
				},
			],
			options: {
				layout: "list",
			},
		},
		{
			title: "Credits",
			name: "credits",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						{
							name: "title",
							title: "Title",
							type: "string",
							validation: (Rule) => Rule.required(), // Ensure a title is provided
						},
						{
							name: "people",
							title: "People",
							type: "array",
							of: [{ type: "reference", to: [{ type: "person" }] }], // Reference to the 'Person' type
						},
					],
				},
			],
			options: {
				layout: "list",
			},
		},
		// {
		// 	name: "people",
		// 	title: "People",
		// 	type: "document",
		// 	fields: [
		// 		{
		// 			name: "title",
		// 			title: "Title",
		// 			type: "string",
		// 			validation: (Rule) => Rule.required(), // Ensure a title is provided
		// 		},
		// 		{
		// 			name: "people",
		// 			title: "People",
		// 			type: "array",
		// 			of: [{ type: "reference", to: [{ type: "person" }] }], // Reference to the 'Person' type
		// 		},
		// 	],
		// },
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
};
