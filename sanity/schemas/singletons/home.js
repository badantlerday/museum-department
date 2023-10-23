export const home = {
	name: "home",
	title: "Home",
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
			name: "overview",
			description:
				"Used both for the <meta> description tag for SEO, and the personal website subheader.",
			title: "Description",
			type: "array",
			of: [
				// Paragraphs
				{
					lists: [],
					marks: {
						annotations: [
							{
								name: "link",
								type: "object",
								title: "Link",
								fields: [
									{
										name: "href",
										type: "url",
										title: "Url",
									},
								],
							},
						],
						decorators: [
							{
								title: "Italic",
								value: "em",
							},
							{
								title: "Strong",
								value: "strong",
							},
						],
					},
					styles: [],
					type: "block",
				},
			],
			validation: (rule) => rule.max(155).required(),
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
