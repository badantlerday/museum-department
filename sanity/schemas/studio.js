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
