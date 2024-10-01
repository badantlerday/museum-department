import { defineField, defineType } from "sanity";
import { ImagesIcon, UsersIcon, ProjectsIcon } from "@sanity/icons";

export default defineType({
	name: "project",
	title: "Project",
	type: "document",
	icon: ProjectsIcon,
	groups: [
		{
			name: "information",
			title: "Information",
			default: true,
		},
		// {
		// 	name: "content",
		// 	title: "Media",
		// },
		{
			name: "media",
			title: "Media",
		},
		{
			name: "ondisplay",
			title: "On Display",
		},

		{
			name: "seo",
			title: "SEO",
		},
	],
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
			group: "information",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			group: "information",
			options: {
				source: "title",
				maxLength: 96,
			},
		},
		{
			title: "On Display",
			name: "ondisplay",
			type: "boolean",
			group: "ondisplay",
		},
		{
			name: "displaySettings",
			title: "On Display Settings",
			description:
				"Set the start and end date for when the project is on display",
			type: "object",
			group: "ondisplay",
			options: {
				columns: 1, // Defines a grid for the fields and how many columns it should have
			},
			fields: [
				{
					name: "ondisplayAlignment",
					title: "Alignment",
					type: "string",
					options: {
						list: [
							{ title: "Left", value: "left" },
							{ title: "Center", value: "center" },
							{ title: "Right", value: "right" },
							{ title: "Full", value: "full" },
						],
						direction: "horizontal",
						layout: "radio",
					},
					hidden: ({ document }) => !document.ondisplay, // Hide when 'ondisplay' is false
				},
				{
					name: "ondisplayByline",
					title: "Byline",
					type: "string",
					hidden: ({ document }) => !document.ondisplay, // Hide when 'ondisplay' is false
				},
				{
					name: "ondisplayImage",
					title: "Image",
					type: "image",
					options: {
						hotspot: true,
					},
					hidden: ({ document }) => !document.ondisplay, // Hide when 'ondisplay' is false
				},
				{
					name: "ondisplayVideo",
					title: "Video (Not Implemented in frontend yet)",
					type: "cloudinary.asset",
					hidden: ({ document }) => !document.ondisplay, // Hide when 'ondisplay' is false
				},
				{
					name: "ondisplayStart",
					title: "Start",
					type: "datetime",
					hidden: ({ document }) => !document.ondisplay, // Hide when 'ondisplay' is false
				},
				{
					name: "ondisplayEnd",
					title: "End",
					type: "datetime",
					hidden: ({ document }) => !document.ondisplay, // Hide when 'ondisplay' is false
				},
			],
		},
		defineField({
			title: "Published At",
			name: "publishedAt",
			type: "datetime",
			group: "information",
		}),
		defineField({
			title: "Updated At",
			name: "updatedAt",
			type: "datetime",
			group: "information",
		}),
		{
			name: "information",
			title: "Information",
			type: "blockContent",
			group: "information",
		},
		// {
		// 	name: "year",
		// 	title: "Year",
		// 	type: "number",
		// 	group: "information",
		// },
		defineField({
			title: "Category",
			name: "category",
			type: "array",
			group: "information",
			of: [
				{
					type: "reference",
					to: [{ type: "category" }],
					options: {
						disableNew: false,
						filter: `"project" in connection`,
						sort: [{ field: "title", direction: "asc" }],
					},
				},
			],
			options: {
				layout: "list",
			},
		}),
		{
			title: "Studio",
			name: "studio",
			type: "reference",
			group: "information",
			to: [{ type: "studio" }],
			weak: true,
			options: {
				disableNew: true,
			},
		},
		{
			title: "Fonts in Use",
			name: "fontsInUse",
			type: "array",
			group: "information",
			of: [
				{
					type: "reference",
					to: [{ type: "typeface" }],
					options: {
						disableNew: false,
					},
				},
			],
			options: {
				layout: "list",
			},
		},
		{
			title: "Credits",
			name: "credits",
			type: "array",
			group: "information",
			of: [
				{
					type: "object",
					fields: [
						{
							title: "Title Category",
							name: "category",
							type: "reference",
							to: [{ type: "category" }],
							options: {
								disableNew: false,
							},
						},
						{
							name: "title",
							title: "Title",
							type: "string",
							validation: (Rule) => Rule.required(), // Ensure a title is provided
						},
						{
							name: "people",
							title: "People",
							type: "array",
							of: [{ type: "reference", to: [{ type: "person" }] }], // Reference to the 'Person' type
						},
					],
					preview: {
						select: {
							title: "category.title",
							credit0: "people.0.name", // <- authors.0 is a reference to author, and the preview component will automatically resolve the reference and return the name
							credit1: "people.1.name",
							credit2: "people.2.name",
							credit3: "people.3.name",
						},
						prepare(selection) {
							const { title, credit0, credit1, credit2, credit3 } = selection;
							const credits = [credit0, credit1, credit2].filter(Boolean);
							const subtitle =
								credits.length > 0 ? `by ${credits.join(", ")}` : "";
							const hasMoreAuthors = Boolean(credit3);

							return {
								title: title,
								subtitle: hasMoreAuthors ? `${subtitle}…` : subtitle,
								media: UsersIcon,
								// subtitle: people
								// 	? people.map((person) => person.name).join(", ")
								// 	: "No people connected",
							};
						},
					},
				},
			],
			options: {
				layout: "list",
			},
		},
		// MEDIA
		defineField({
			title: "Size for Main Image/Video",
			name: "sizeMedia",
			type: "string",
			group: "media",
			options: {
				list: [
					{ title: "X-Large", value: "xl" },
					{ title: "Large", value: "lg" },
					{ title: "Medium", value: "md" },
					{ title: "Small", value: "sm" },
				],
				layout: "radio", // <-- defaults to 'dropdown'
				direction: "horizontal", // <-- defaults to 'vertical'
			},
		}),
		defineField({
			name: "mainImage",
			title: "Main image",
			type: "image",
			group: "media",
			options: {
				hotspot: true,
			},
			// fields: [
			// 	defineField({
			// 		title: "Size",
			// 		name: "size",
			// 		type: "string",
			// 		options: {
			// 			list: [
			// 				{ title: "X-Large", value: "xl" },
			// 				{ title: "Large", value: "lg" },
			// 				{ title: "Medium", value: "md" },
			// 				{ title: "Small", value: "sm" },
			// 			],
			// 			layout: "radio", // <-- defaults to 'dropdown'
			// 			direction: "horizontal", // <-- defaults to 'vertical'
			// 		},
			// 	}),
			// ],
			// initialValue: {
			// 	size: "lg",
			// },
		}),
		{
			name: "mainVideo",
			title: "Main Video",
			type: "cloudinary.asset",
			group: "media",
		},
		{
			name: "posterImage",
			title: "Poster image",
			type: "image",
			group: "media",
			options: {
				hotspot: true,
			},
		},
		defineField({
			title: "SEO / Share Settings",
			name: "seo",
			type: "seo",
			group: "seo",
		}),
		// defineField({
		// 	title: "Media",
		// 	name: "content",
		// 	type: "media",
		// 	group: "content",
		// }),
		{
			title: "Page Blocks",
			name: "pageBlocks",
			type: "array",
			group: "media",
			// options: {
			// 	layout: "grid",
			// },
			of: [
				{ type: "casemedia" },
				// { type: "slideshow" }
			],
		},
		// {
		// 	title: "Gallery",
		// 	name: "gallery",
		// 	type: "gallery",
		// 	group: "information",
		// },
		// {
		// 	name: "people",
		// 	title: "People",
		// 	type: "document",
		// 	fields: [
		// 		{
		// 			name: "title",
		// 			title: "Title",
		// 			type: "string",
		// 			validation: (Rule) => Rule.required(), // Ensure a title is provided
		// 		},
		// 		{
		// 			name: "people",
		// 			title: "People",
		// 			type: "array",
		// 			of: [{ type: "reference", to: [{ type: "person" }] }], // Reference to the 'Person' type
		// 		},
		// 	],
		// },
	],
	initialValue: {
		sizeMedia: "lg",
	},
	preview: {
		select: {
			title: "title",
			studioName: "studio.name",
			posterImage: "posterImage",
			onDisplay: "displaySettings.ondisplayAlignment",
		},
		prepare(selection) {
			const { title, studioName, posterImage, onDisplay } = selection;
			let displayLabel = "";

			if (onDisplay) {
				switch (onDisplay) {
					case "left":
						displayLabel = "(L)";
						break;
					case "center":
						displayLabel = "(C)";
						break;
					case "right":
						displayLabel = "(R)";
						break;
					case "full":
						displayLabel = "(F)";
						break;
					default:
						displayLabel = `(${onDisplay})`; // Fallback for unexpected values
				}
			}

			return {
				title: title,
				subtitle: studioName
					? `${studioName} ${displayLabel}`
					: "No studio connected",
				media: posterImage,
			};
		},
	},
});
