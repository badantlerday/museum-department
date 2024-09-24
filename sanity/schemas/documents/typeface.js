import { defineField, defineType } from "sanity";
import { BlockContentIcon } from "@sanity/icons";
export default defineType({
	name: "typeface",
	title: "Typeface",
	type: "document",
	icon: BlockContentIcon,
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
	],
	fields: [
		{
			name: "name",
			title: "Name",
			type: "string",
			group: "information",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			group: "information",
			options: {
				source: "name",
				maxLength: 96,
			},
		},
		defineField({
			name: "information",
			title: "Information",
			type: "blockContent",
			group: "information",
		}),
		{
			name: "realaseYear",
			title: "Release Year",
			type: "number",
			group: "information",
		},
		defineField({
			title: "URL",
			name: "fontUrl",
			type: "object",
			group: "information",
			options: {
				columns: 2,
			},
			fields: [
				{
					name: "url",
					type: "url",
					title: "URL",
					description: "Link to buy or download the font",
				},
				{
					name: "label",
					type: "string",
					title: "Label",
					description: "Label of the link",
				},
			],
		}),
		defineField({
			title: "Style",
			name: "style",
			type: "string",
			group: "information",
			options: {
				list: [
					{ title: "Sans Serif", value: "Sans Serif" },
					{ title: "Serif", value: "Serif" },
					{ title: "Script", value: "Script" },
					{ title: "Display", value: "Display" },
					{ title: "Monospace", value: "Monospace" },
					{ title: "Handwritten", value: "Handwritten" },
					{ title: "Decorative", value: "Decorative" },
				],
				layout: "dropdown", // <-- defaults to 'dropdown'
				direction: "horizontal", // <-- defaults to 'vertical'
			},
		}),
		{
			title: "Foundry",
			name: "foundry",
			type: "reference",
			group: "information",
			to: [{ type: "foundry" }],
			weak: true,
			options: {
				disableNew: false,
			},
		},
		defineField({
			name: "mainImage",
			title: "Main image",
			type: "image",
			group: "media",
			options: {
				hotspot: true,
			},
		}),
		{
			name: "posterImage",
			title: "Poster image",
			type: "image",
			group: "media",
			options: {
				hotspot: true,
			},
		},
		{
			name: "specimenPoster",
			title: "Specimen",
			type: "image",
			group: "media",
			options: {
				hotspot: true,
			},
		},
	],
	preview: {
		select: {
			title: "name",
			foundryName: "foundry.name",
			media: "specimenPoster",
		},
		prepare(selection) {
			// Customize the preview title to include the category name
			const { title, foundryName, media } = selection;
			return {
				title: title,
				subtitle: foundryName ? `${foundryName}` : "No foundry connected",
				media,
			};
		},
	},
});
