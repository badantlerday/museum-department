export const settings = {
	name: "settings",
	title: "Settings",
	type: "document",
	fields: [
		{
			name: "title",
			description: "This field is the title of your personal website.",
			title: "Title",
			type: "string",
			validation: (rule) => rule.required(),
		},
		{
			name: "fontgallery",
			title: "Font Gallery Highlights",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "typeface" }],
					options: {
						disableNew: true,
					},
				},
			],
		},
	],
	__experimental_omnisearch_visibility: false,
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return {
				subtitle: "Home",
				title,
			};
		},
	},
};
