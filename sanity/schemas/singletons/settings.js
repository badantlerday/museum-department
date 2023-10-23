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
		// {
		// 	name: "footer",
		// 	description:
		// 		"This is a block of text that will be displayed at the bottom of the page.",
		// 	title: "Footer Info",
		// 	type: "array",
		// 	of: [
		// 		{
		// 			type: "block",
		// 			marks: {
		// 				annotations: [
		// 					{
		// 						name: "link",
		// 						type: "object",
		// 						title: "Link",
		// 						fields: [
		// 							{
		// 								name: "href",
		// 								type: "url",
		// 								title: "Url",
		// 							},
		// 						],
		// 					},
		// 				],
		// 			},
		// 		},
		// 	],
		// },
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
