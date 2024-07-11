import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";
export default defineType({
	name: "foundry",
	title: "Foundry",
	type: "document",
	icon: BookIcon,
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
		{
			name: "founded",
			title: "Founded",
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
			name: "mainImage",
			title: "Main image",
			type: "image",
			group: "media",
			options: {
				hotspot: true,
			},
		},
		{
			name: "mainFontImage",
			title: "Main Font image",
			type: "image",
			group: "media",
		},
		{
			title: "Location",
			name: "location",
			type: "array",
			group: "information",
			of: [
				{
					type: "reference",
					to: [{ type: "city" }],
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
			title: "Staff",
			name: "staff",
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
	],

	preview: {
		select: {
			title: "name",
			cityName: "location.0.name",
			// mainImage: "mainImage",
		},
		prepare(selection) {
			// Customize the preview title to include the category name
			const { title, cityName, mainImage } = selection;
			return {
				title: title,
				subtitle: cityName ? `${cityName}` : "No city connected",
				// media: mainImage,
			};
		},
	},
});
