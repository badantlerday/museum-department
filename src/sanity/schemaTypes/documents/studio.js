import { defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons";

export default defineType({
	name: "studio",
	title: "Studio",
	type: "document",
	icon: CaseIcon,
	groups: [
		{ title: "Information", name: "information", default: true },
		{ title: "Media", name: "media" },
		{ title: "Explore More", name: "explore" },
		{ title: "SEO", name: "seo" },
	],
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
			group: "information",
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
			group: "information",
			options: {
				source: "name",
				maxLength: 96,
			},
		}),
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
		defineField({
			name: "mainImage",
			title: "Main image",
			type: "image",
			group: "media",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "mainVideo",
			title: "Main Video",
			type: "cloudinary.asset",
			group: "media",
		}),
		defineField({
			name: "posterImage",
			title: "Poster image",
			type: "image",
			group: "media",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			title: "Description",
			name: "description",
			type: "array",
			group: "information",
			of: [{ type: "block", styles: [] }],
		}),
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
						filter: `"studio" in connection`,
						sort: [{ field: "title", direction: "asc" }],
					},
				},
			],
			options: {
				layout: "list",
			},
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
			group: "information",
		}),
		defineField({
			title: "Size",
			name: "size",
			type: "number",
			group: "information",
		}),
		defineField({
			title: "Location",
			name: "location",
			type: "array",
			group: "information",
			of: [
				{
					type: "reference",
					to: [{ type: "city" }],
					options: {
						disableNew: false,
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
			group: "information",
		}),
		defineField({
			title: "Instagram",
			name: "instagram",
			type: "url",
			group: "information",
		}),
		defineField({
			title: "Studio Sounds",
			name: "studioSoundsPlaylist",
			type: "string",
			description: "Spotify Playlist URI",
			group: "information",
		}),
		defineField({
			title: "Studio Interview",
			name: "interview",
			type: "reference",
			description: "Connect an interview to this Studio",
			group: "information",
			to: [{ type: "interview" }],
			weak: false,
			options: {
				disableNew: true,
			},
		}),

		defineField({
			title: "Favourite",
			name: "favourite",
			type: "boolean",
			description: "Is this a Museum Department feature?",
			group: "information",
		}),
		defineField({
			title: "Explore More",
			description: "Not fully completed in frontend yet.",
			name: "exploreMore",
			type: "object",
			group: "explore",
			options: {
				collapsible: true,
				collapsed: false,
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
