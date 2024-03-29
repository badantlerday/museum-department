import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";
export default defineType({
	name: "foundry",
	title: "Foundry",
	type: "document",
	icon: BookIcon,
	fields: [
		{
			name: "name",
			title: "Name",
			type: "string",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
				maxLength: 96,
			},
		},
		{
			name: "founded",
			title: "Founded",
			type: "number",
		},
		{
			name: "information",
			title: "Information",
			type: "blockContent",
		},
		{
			name: "mainImage",
			title: "Main image",
			type: "image",
			options: {
				hotspot: true,
			},
		},
		{
			name: "mainFontImage",
			title: "Main Font image",
			type: "image",
		},
		{
			title: "Location",
			name: "location",
			type: "array",
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
		},
		prepare({ title }) {
			return {
				title: title,
			};
		},
	},
});
