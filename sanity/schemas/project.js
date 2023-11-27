import { ImagesIcon } from "@sanity/icons";

export const project = {
	name: "project",
	title: "Project",
	type: "document",
	icon: ImagesIcon,
	groups: [
		{
			name: "information",
			title: "Information",
			default: true,
		},
		{
			name: "media",
			title: "Media",
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
			title: "On Display",
			name: "ondisplay",
			type: "boolean",
			group: "information",
		},
		{
			name: "displaySettings",
			title: "On Display Settings",
			description:
				"Set the start and end date for when the project is on display",
			type: "object",
			group: "information",
			options: {
				columns: 2, // Defines a grid for the fields and how many columns it should have
			},
			fields: [
				{
					name: "ondisplayStart",
					title: "Start",
					type: "datetime",
					hidden: ({ document }) => !document.ondisplay, // Hide when 'ondisplay' is false
				},
				{
					name: "ondisplayEnd",
					title: "End",
					type: "datetime",
					hidden: ({ document }) => !document.ondisplay, // Hide when 'ondisplay' is false
				},
			],
		},
		{
			name: "publishedAt",
			title: "Published at",
			type: "datetime",
			group: "information",
		},
		{
			name: "year",
			title: "Year",
			type: "number",
			group: "information",
		},
		{
			title: "Studio",
			name: "studio",
			type: "reference",
			group: "information",
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
			group: "information",
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
			group: "information",
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
		// MEDIA
		{
			name: "posterImage",
			title: "Poster image",
			type: "image",
			group: "media",
			options: {
				hotspot: true,
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
