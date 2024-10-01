// schemas/footnote.js
import { defineField, defineType } from "sanity";
export default defineType({
	name: "footnote",
	type: "object",
	title: "Footnote",
	fields: [
		{
			name: "text",
			type: "string",
			title: "Text",
		},
	],
});
