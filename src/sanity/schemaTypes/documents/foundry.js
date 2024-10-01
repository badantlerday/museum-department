import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";
export default defineType({
  name: "foundry",
  title: "Foundry",
  type: "document",
  icon: BookIcon,
  groups: [
    {
      name: "information",
      title: "Information",
      default: true,
    },
    {
      name: "media",
      title: "Media",
    },
    { title: "SEO", name: "seo" },
  ],
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      group: "information",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "information",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "founded",
      title: "Founded",
      type: "number",
      group: "information",
    },
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
      title: "Size",
      name: "size",
      type: "number",
      group: "information",
    }),
    {
      name: "information",
      title: "Information",
      type: "blockContent",
      group: "information",
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      group: "media",
      options: {
        hotspot: true,
      },
    },
    {
      name: "mainFontImage",
      title: "Main Font image",
      type: "image",
      group: "media",
    },
    {
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
    },
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
      title: "Type Designers",
      name: "typeDesigners",
      type: "array",
      group: "information",
      of: [
        {
          type: "reference",
          to: [{ type: "person" }],
          options: {
            disableNew: false,
          },
        },
      ],
      options: {
        layout: "list",
      },
    }),
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
    // {
    // 	title: "Staff",
    // 	name: "staff",
    // 	type: "array",
    // 	of: [
    // 		{
    // 			type: "object",
    // 			fields: [
    // 				{
    // 					name: "title",
    // 					title: "Title",
    // 					type: "string",
    // 					validation: (Rule) => Rule.required(), // Ensure a title is provided
    // 				},
    // 				{
    // 					name: "people",
    // 					title: "People",
    // 					type: "array",
    // 					of: [{ type: "reference", to: [{ type: "person" }] }], // Reference to the 'Person' type
    // 				},
    // 			],
    // 		},
    // 	],
    // 	options: {
    // 		layout: "list",
    // 	},
    // },
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
      // mainImage: "mainImage",
    },
    prepare(selection) {
      // Customize the preview title to include the category name
      const { title, cityName, mainImage } = selection;
      return {
        title: title,
        subtitle: cityName ? `${cityName}` : "No city connected",
        // media: mainImage,
      };
    },
  },
});
