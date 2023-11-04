export default {
	title: "SEO / Share Settings",
	name: "seo",
	type: "object",
	options: {
		collapsible: true,
	},
	fields: [
		{
			title: "Meta title",
			name: "metaTitle",
			type: "string",
			description: "Title used for search engines and browsers",
			validation: (Rule) =>
				Rule.max(50).warning(
					"Longer titles may be truncated by search engines"
				),
		},
		{
			title: "Meta description",
			name: "metaDescription",
			type: "text",
			rows: 3,
			description: "Description for search engines",
			validation: (Rule) =>
				Rule.max(150).warning(
					"Longer descriptions may be truncated by search engines"
				),
		},
		{
			title: "Meta image",
			name: "metaImage",
			type: "image",
			description: "Recommended size: 1200x630 (PNG or JPG)",
		},
	],
};
