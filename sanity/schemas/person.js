import { UserIcon } from "@sanity/icons";
export const person = {
	name: "person",
	title: "Person",
	type: "document",
	icon: UserIcon,
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
