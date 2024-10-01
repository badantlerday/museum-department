import { defineField, defineType } from 'sanity';

export default defineType({
    title: 'Site seo',
    name: 'siteSeo',
    type: 'object',
    options: {
        collapsible: true,
    },
    description: 'Set the basic info for your website.',
    group: 'seo',
    fields: [
        defineField({
            title: 'Website title',
            name: 'title',
            type: 'string',
            description: 'Used as title suffix on pages.',
        }),

        defineField({
            title: 'Website description',
            name: 'description',
            type: 'text',
            rows: 3,
            description:
                'In a few words, explain what this site is about. This field will be used as a fallback for page meta description.',
            validation: (Rule) =>
                Rule.max(150).warning(
                    'Longer text may be truncated by search engines',
                ),
        }),

        defineField({
            title: 'Title separator',
            name: 'separator',
            type: 'string',
            description:
                'Used in page titles to separate the page title from the website name.',
        }),

        defineField({
            title: 'Site image',
            name: 'image',
            type: 'image',
            description:
                "This image is used as a fallback for pages/articles that don't have any images set.",
            options: { hotspot: true },
        }),

        defineField({
            title: 'Base url',
            name: 'baseUrl',
            type: 'string'
        }),
        defineField({
            title: 'Locale',
            name: 'locale',
            type: 'string'
        }),
    ],
});