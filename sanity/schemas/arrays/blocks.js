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
			name: "casemedia",
			type: "casemedia",
		}),
		defineArrayMember({
			name: "slideshow",
			type: "slideshow",
		}),
		defineArrayMember({
			name: "ondisplay",
			type: "ondisplay",
		}),
		defineArrayMember({
			name: "manifest",
			type: "manifest",
		}),
		defineArrayMember({
			name: "exploremore",
			type: "exploremore",
		}),
		defineArrayMember({
			name: "callout",
			type: "callout",
		}),
		defineArrayMember({
			name: "becomeasupporter",
			type: "becomeasupporter",
		}),
	],
});
