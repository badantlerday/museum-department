import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export default defineType({
	name: "person",
	title: "Person",
	type: "document",
	icon: UserIcon,
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
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
