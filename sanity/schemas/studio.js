import { CaseIcon } from "@sanity/icons";
export const studio = {
	name: "studio",
	title: "Studio",
	type: "document",
	icon: CaseIcon,
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
			name: "mainImage",
			title: "Main image",
			type: "image",
			options: {
				hotspot: true,
			},
		},
		{
			name: "posterImage",
			title: "Poster image",
			type: "image",
			options: {
				hotspot: true,
			},
		},
		{
			title: "Description",
			name: "description",
			type: "array",
			of: [{ type: "block", styles: [] }],
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
	],

	preview: {
		select: {
			title: "name",
			cityName: "location.0.city",
		},
	},
};
