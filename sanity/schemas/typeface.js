import { BlockContentIcon } from "@sanity/icons";
export const typeface = {
	name: "typeface",
	title: "Typeface",
	type: "document",
	icon: BlockContentIcon,
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
			title: "Foundry",
			name: "foundry",
			type: "reference",
			to: [{ type: "foundry" }],
			weak: true,
			options: {
				disableNew: true,
			},
		},
	],
	preview: {
		select: {
			title: "name",
			foundryName: "foundry.name",
		},
		prepare(selection) {
			// Customize the preview title to include the category name
			const { title, foundryName } = selection;
			return {
				title: title,
				subtitle: foundryName ? `${foundryName}` : "No foundry connected",
			};
		},
	},
};
