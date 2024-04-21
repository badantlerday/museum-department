import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export default defineType({
	name: "advertise",
	title: "Advertise in Newsletter",
	type: "document",
	icon: EnvelopeIcon,
	fields: [
		{
			name: "issue",
			title: "Issue",
			type: "string",
		},
		defineField({
			title: "Date",
			name: "date",
			type: "date",
		}),
		defineField({
			title: "Price",
			name: "price",
			type: "object",
			options: {
				columns: 2,
			},
			fields: [
				defineField({
					name: "sponsor",
					title: "Sponsor",
					type: "string",
					initialValue: "$200",
				}),
				defineField({
					name: "classified",
					title: "Classified",
					type: "string",
					initialValue: "$50",
				}),
			],
		}),
		{
			title: "Sponsor",
			name: "sponsor1",
			type: "object",
			fields: [
				defineField({
					title: "Is this booked?",
					name: "status",
					type: "boolean",
					initialValue: false,
				}),

				defineField({
					name: "customerEmail",
					title: "Customer Email",
					type: "string",
				}),
			],
		},
		defineField({
			title: "Classified 1",
			name: "classified1",
			type: "object",

			fields: [
				defineField({
					title: "Is this booked?",
					name: "status",
					type: "boolean",
					initialValue: false,
				}),
				defineField({
					name: "customerEmail",
					title: "Customer Email",
					type: "string",
				}),
				defineField({
					name: "url",
					title: "Url",
					type: "string",
				}),
				defineField({
					name: "urlTitle",
					title: "Title",
					type: "string",
				}),
			],
		}),
		defineField({
			title: "Classified 2",
			name: "classified2",
			type: "object",
			fields: [
				defineField({
					title: "Is this booked?",
					name: "status",
					type: "boolean",
					initialValue: false,
				}),
				defineField({
					name: "customerEmail",
					title: "Customer Email",
					type: "string",
				}),
				defineField({
					name: "url",
					title: "Url",
					type: "string",
				}),
				defineField({
					name: "urlTitle",
					title: "Title",
					type: "string",
				}),
			],
		}),
		defineField({
			title: "Classified 3",
			name: "classified3",
			type: "object",
			fields: [
				defineField({
					title: "Is this booked?",
					name: "status",
					type: "boolean",
					initialValue: false,
				}),
				defineField({
					name: "customerEmail",
					title: "Customer Email",
					type: "string",
				}),
				defineField({
					name: "url",
					title: "Url",
					type: "string",
				}),
				defineField({
					name: "urlTitle",
					title: "Title",
					type: "string",
				}),
			],
		}),
		defineField({
			title: "Classified 4",
			name: "classified4",
			type: "object",
			fields: [
				defineField({
					title: "Is this booked?",
					name: "status",
					type: "boolean",
					initialValue: false,
				}),
				defineField({
					name: "customerEmail",
					title: "Customer Email",
					type: "string",
				}),
				defineField({
					name: "url",
					title: "Url",
					type: "string",
				}),
				defineField({
					name: "urlTitle",
					title: "Title",
					type: "string",
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "issue",
			sponsor: "sponsor1.status",
			classified1: "classified1.status",
			classified2: "classified2.status",
			classified3: "classified3.status",
			classified4: "classified4.status",
			date: "date",
		},
		prepare(selection) {
			const {
				title,
				sponsor,
				classified1,
				classified2,
				classified3,
				classified4,
				date,
			} = selection;

			// // Function to generate filled circle HTML based on boolean value
			function checkValue(value) {
				return value ? "●" : "○";
			}

			function checkValueSponsor(value) {
				return value ? "◆" : "◇";
			}

			const status = checkValueSponsor(sponsor);
			const classified1status = checkValue(classified1);
			const classified2status = checkValue(classified2);
			const classified3status = checkValue(classified3);
			const classified4status = checkValue(classified4);

			return {
				title: `${title} (${date})`,
				subtitle: `${status} ${classified1status} ${classified2status} ${classified3status} ${classified4status}`,
			};
		},
	},
});
