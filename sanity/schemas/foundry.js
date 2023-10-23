import { BookIcon } from "@sanity/icons";
export const foundry = {
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
	],

	preview: {
		select: {
			title: "name",
		},
	},
};
