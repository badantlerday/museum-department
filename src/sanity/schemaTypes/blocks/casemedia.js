import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

export default defineType({
	type: "object",
	name: "casemedia",
	title: "Case Media",
	fields: [
		defineField({
			name: "image",
			title: "Image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			title: "Video",
			type: "cloudinary.asset",
			name: "video",
			description: "This asset is served from Cloudinary",
		}),
		defineField({
			name: "sticky",
			title: "Make sticky",
			type: "boolean",
			description:
				"If checked, the media will be sticky to the top of the page.",
		}),
		defineField({
			title: "Layout Options",
			name: "layoutoptions",
			type: "string",
			options: {
				list: [
					{ title: "Full Width", value: "full_width" },
					{ title: "Half Width", value: "half_width" },
					{ title: "Half with gutter right", value: "50_gutter_right" },
					{ title: "Half with gutter left", value: "50_gutter_left" },
					{ title: "Half with space right", value: "50_space_right" },
					{ title: "Half with space left", value: "50_space_left" },
				],
			},
		}),
		defineField({
			name: "caption",
			title: "Caption",
			type: "blockContentSmall",
		}),
	],
	icon: StarIcon,
	preview: {
		select: {
			subtitle: "layoutoptions",
			image: "image",
		},
		prepare({ subtitle, image }) {
			if (subtitle == "50_gutter_right") {
				subtitle = "Half with gutter right";
			}
			if (subtitle == "50_gutter_left") {
				subtitle = "Half with gutter left";
			}
			if (subtitle == "50_space_right") {
				subtitle = "Half with space right";
			}
			if (subtitle == "50_space_left") {
				subtitle = "Half with space left";
			}
			if (subtitle == "full_width") {
				subtitle = "Full Width";
			}
			if (subtitle == "half_width") {
				subtitle = "Half Width";
			}

			return {
				title: "Case Media",
				subtitle: subtitle ? subtitle : "No layout options selected",
				media: image ? image : StarIcon,
			};
		},
	},
});
