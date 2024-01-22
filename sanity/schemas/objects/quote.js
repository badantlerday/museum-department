export default {
	title: "Quote",
	name: "quote",
	type: "object",
	fields: [
		{
			title: "Text",
			name: "text",
			type: "text",
		},
		{
			title: "Person",
			name: "person",
			type: "string",
		},
	],
	preview: {
		prepare: ({}) => {
			return {
				title: "Quote",
			};
		},
	},
};
