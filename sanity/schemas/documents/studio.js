import { defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons";

export default defineType({
	name: "studio",
	title: "Studio",
	type: "document",
	icon: CaseIcon,
	groups: [
		{ title: "Content", name: "content", default: true },
		{ title: "SEO", name: "seo" },
	],
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
			group: "content",
		}),
		// defineField({
		// 	name: "idNumber",
		// 	title: "ID Number",
		// 	type: "number",
		// 	group: "content",
		// }),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			group: "content",
			options: {
				source: "name",
				maxLength: 96,
			},
		}),

		defineField({
			name: "mainImage",
			title: "Main image",
			type: "image",
			group: "content",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "posterImage",
			title: "Poster image",
			type: "image",
			group: "content",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			title: "Description",
			name: "description",
			type: "array",
			group: "content",
			of: [{ type: "block", styles: [] }],
		}),
		// defineField({
		// 	title: "Featured",
		// 	name: "featured",
		// 	type: "boolean",
		// 	description: "Is this a featured Studio?",
		// 	group: "content",
		// }),

		// defineField({
		// 	title: "Hype",
		// 	name: "hype",
		// 	type: "number",
		// 	group: "content",
		// }),

		defineField({
			title: "Founded",
			name: "founded",
			type: "number",
			group: "content",
		}),
		defineField({
			title: "Size",
			name: "size",
			type: "number",
			group: "content",
		}),
		defineField({
			title: "Location",
			name: "location",
			type: "array",
			group: "content",
			of: [
				{
					type: "reference",
					to: [{ type: "city" }],
					options: {
						disableNew: true,
					},
				},
			],
			options: {
				layout: "list",
			},
		}),
		defineField({
			title: "Category",
			name: "category",
			type: "array",
			group: "content",
			of: [
				{
					type: "reference",
					to: [{ type: "category" }],
					options: {
						disableNew: false,
						filter: `"studio" in connection`,
						sort: [{ field: "title", direction: "asc" }],
					},
				},
			],
			options: {
				layout: "list",
			},
		}),

		defineField({
			title: "Website",
			name: "website",
			type: "url",
			group: "content",
		}),
		defineField({
			title: "Instagram",
			name: "instagram",
			type: "url",
			group: "content",
		}),
		defineField({
			title: "Studio Sounds",
			name: "studioSoundsPlaylist",
			type: "string",
			description: "Spotify Playlist URI",
			group: "content",
		}),
		defineField({
			title: "Studio Interview",
			name: "interview",
			type: "reference",
			description: "Connect an interview to this Studio",
			group: "content",
			to: [{ type: "interview" }],
			weak: false,
			options: {
				disableNew: true,
			},
		}),
		defineField({
			title: "Published At",
			name: "publishedAt",
			type: "datetime",
			group: "content",
		}),
		defineField({
			title: "Updated At",
			name: "updatedAt",
			type: "datetime",
			group: "content",
		}),
		defineField({
			title: "Favourite",
			name: "favourite",
			type: "boolean",
			description: "Is this a Museum Department feature?",
			group: "content",
		}),
		defineField({
			title: "Explore More",
			name: "exploreMore",
			type: "object",
			group: "content",
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				defineField({
					title: "What type of content do you want to explore?",
					name: "documentTypes",
					type: "string",
					options: {
						list: [
							{ title: "Studios", value: "studio" },
							{ title: "Projects", value: "project" },
							{ title: "Foundries", value: "foundry" },
							{ title: "Typefaces", value: "typface" },
							// Add more document types as needed
						],
					},
				}),
				defineField({
					title: "City",
					name: "city",
					type: "array",
					of: [
						{
							type: "reference",
							to: [{ type: "city" }],
							options: {
								disableNew: true,
							},
						},
					],
				}),
				defineField({
					title: "Country",
					name: "country",
					type: "array",
					of: [
						{
							type: "reference",
							to: [{ type: "country" }],
							options: {
								disableNew: true,
							},
						},
					],
				}),
				defineField({
					title: "Category",
					name: "category",
					type: "array",
					of: [
						{
							type: "reference",
							to: [{ type: "category" }],
							options: {
								disableNew: true,
							},
						},
					],
				}),
			],
		}),
		defineField({
			title: "SEO / Share Settings",
			name: "seo",
			type: "seo",
			group: "seo",
		}),
	],
	preview: {
		select: {
			title: "name",
			cityName: "location.0.name",
			mainImage: "mainImage",
		},
		prepare(selection) {
			// Customize the preview title to include the category name
			const { title, cityName, mainImage } = selection;
			return {
				title: title,
				subtitle: cityName ? `${cityName}` : "No city connected",
				media: mainImage,
			};
		},
	},
});
