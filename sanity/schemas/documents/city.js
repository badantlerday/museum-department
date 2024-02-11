import { defineField, defineType } from "sanity";
import { PinIcon } from "@sanity/icons";

export default defineType({
	name: "city",
	title: "City",
	type: "document",
	icon: PinIcon,
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
			title: "Country",
			name: "country",
			type: "reference",
			to: [{ type: "country" }],
			weak: true,
			options: {
				disableNew: true,
			},
		},
	],

	preview: {
		select: {
			title: "name",
			countryName: "country.name",
		},
		prepare(selection) {
			// Customize the preview title to include the category name
			const { title, countryName } = selection;
			return {
				title: title,
				subtitle: countryName ? `${countryName}` : "No country connected",
			};
		},
	},
});
