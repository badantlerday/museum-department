import { defineField, defineArrayMember, defineType } from "sanity";

export default defineType({
	title: "Blocks",
	name: "blocks",
	type: "array",
	of: [
		defineArrayMember({
			name: "hero",
			type: "hero",
		}),
		defineArrayMember({
			name: "split",
			type: "split",
		}),
		defineArrayMember({
			name: "ondisplay",
			type: "ondisplay",
		}),
	],
});
