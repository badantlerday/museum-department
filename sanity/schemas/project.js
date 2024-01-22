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
			name: "content",
			title: "Content",
		},
		{
			name: "media",
			title: "Media",
		},
		{
			name: "ondisplay",
			title: "On Display",
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
			group: "ondisplay",
		},
		{
			name: "displaySettings",
			title: "On Display Settings",
			description:
				"Set the start and end date for when the project is on display",
			type: "object",
			group: "ondisplay",
			options: {
				columns: 1, // Defines a grid for the fields and how many columns it should have
			},
			fields: [
				{
					name: "ondisplayByline",
					title: "Byline",
					type: "string",
					hidden: ({ document }) => !document.ondisplay, // Hide when 'ondisplay' is false
				},
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
			name: "information",
			title: "Information",
			type: "blockContent",
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
			group: "information",
			options: {
				hotspot: true,
			},
		},
		{
			title: "Page Blocks",
			name: "pageBlocks",
			type: "array",
			group: "content",
			of: [{ type: "gallery" }, { type: "quote" }],
		},
		{
			title: "Gallery",
			name: "gallery",
			type: "gallery",
			group: "information",
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
			posterImage: "posterImage",
		},
		prepare(selection) {
			// Customize the preview title to include the category name
			const { title, studioName, posterImage } = selection;
			return {
				title: title,
				subtitle: studioName ? `${studioName}` : "No studio connected",
				media: posterImage,
			};
		},
	},
};
