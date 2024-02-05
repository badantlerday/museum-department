import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

export default defineType({
	type: "object",
	name: "ondisplay",
	title: "On Display",
	fields: [
		defineField({
			name: "text",
			title: "Text",
			type: "string",
		}),
	],
	icon: StarIcon,
});
