import { defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";

export default defineType({
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
					name: "ondisplayAlignment",
					title: "Alignment",
					type: "string",
					options: {
						list: [
							{ title: "Left", value: "left" },
							{ title: "Center", value: "center" },
							{ title: "Right", value: "right" },
							{ title: "Full", value: "full" },
						],
						direction: "horizontal",
						layout: "radio",
					},
					hidden: ({ document }) => !document.ondisplay, // Hide when 'ondisplay' is false
				},
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
		defineField({
			title: "Published At",
			name: "publishedAt",
			type: "datetime",
			group: "information",
		}),
		defineField({
			title: "Updated At",
			name: "updatedAt",
			type: "datetime",
			group: "information",
		}),
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
		defineField({
			title: "Category",
			name: "category",
			type: "array",
			group: "content",
			of: [
				{
					type: "reference",
					to: [{ type: "category" }],
					options: {
						disableNew: false,
					},
				},
			],
			options: {
				layout: "list",
			},
		}),
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
			name: "mainImage",
			title: "Main image",
			type: "image",
			group: "content",
			options: {
				hotspot: true,
			},
		},
		{
			name: "posterImage",
			title: "Poster image",
			type: "image",
			group: "information",
			options: {
				hotspot: true,
			},
		},
		defineField({
			title: "SEO / Share Settings",
			name: "seo",
			type: "seo",
			group: "seo",
		}),
		// {
		// 	title: "Page Blocks",
		// 	name: "pageBlocks",
		// 	type: "array",
		// 	group: "content",
		// 	of: [{ type: "gallery" }, { type: "quote" }],
		// },
		// {
		// 	title: "Gallery",
		// 	name: "gallery",
		// 	type: "gallery",
		// 	group: "information",
		// },
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
			onDisplay: "displaySettings.ondisplayAlignment",
		},
		prepare(selection) {
			// Customize the preview title to include the category name
			const { title, studioName, posterImage, onDisplay } = selection;
			return {
				title: title,
				subtitle: studioName
					? `${studioName} - (${onDisplay})`
					: "No studio connected",
				media: posterImage,
			};
		},
	},
});
