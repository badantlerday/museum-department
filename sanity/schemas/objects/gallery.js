export default {
	name: "gallery",
	type: "object",
	title: "Gallery",
	fields: [
		{
			name: "images",
			type: "array",
			title: "Images",
			of: [
				{
					name: "image",
					type: "image",
					title: "Image",
					options: {
						hotspot: true,
					},
					fields: [
						{
							name: "alt",
							type: "string",
							title: "Alternative text",
						},
						{
							name: "display",
							type: "string",
							title: "Display as",
							description: "How should we display this image?",
							options: {
								list: [
									{ title: "1 Column", value: "1col" },
									{ title: "2 Columns", value: "2col" },
								],
								layout: "radio",
							},
						},
					],
					preview: {
						select: {
							title: "alt",
							media: "images.image.0", // Referencing the image asset directly
							display: "display",
						},
						prepare(selection) {
							const { title, media, display } = selection;
							return {
								title: title || "No ALT text",
								// media: media,
								subtitle: display
									? `Display: ${display}`
									: "Display format not set",
							};
						},
					},
				},
			],
		},
	],
};
