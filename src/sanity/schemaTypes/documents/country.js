import { defineField, defineType } from "sanity";
import { EarthAmericasIcon } from "@sanity/icons";

export default defineType({
	name: "country",
	title: "Country",
	type: "document",
	icon: EarthAmericasIcon,
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
		prepare({ title }) {
			return {
				title: title,
			};
		},
	},
});
