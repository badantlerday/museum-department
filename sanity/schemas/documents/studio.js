import { defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons";

export default defineType({
	name: "studio",
	title: "Studio",
	type: "document",
	icon: CaseIcon,
	groups: [
		{ title: "Content", name: "content", default: true },
		{ title: "SEO", name: "seo" },
	],
	fields: [
		{
			name: "name",
			title: "Name",
			type: "string",
			group: "content",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			group: "content",
			options: {
				source: "name",
				maxLength: 96,
			},
		},
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
			group: "content",
			options: {
				hotspot: true,
			},
		},
		{
			title: "Description",
			name: "description",
			type: "array",
			group: "content",
			of: [{ type: "block", styles: [] }],
		},
		{
			title: "Location",
			name: "location",
			type: "array",
			group: "content",
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
		defineField({
			title: "SEO / Share Settings",
			name: "seo",
			type: "seo",
			group: "seo",
		}),
	],
	preview: {
		select: {
			title: "name",
			cityName: "location.0.name",
			mainImage: "mainImage",
		},
		prepare(selection) {
			// Customize the preview title to include the category name
			const { title, cityName, mainImage } = selection;
			return {
				title: title,
				subtitle: cityName ? `${cityName}` : "No city connected",
				media: mainImage,
			};
		},
	},
});
