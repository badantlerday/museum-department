import { defineField, defineType } from 'sanity';
import { StarIcon } from '@sanity/icons'

export default defineType({
    type: 'object',
    name: 'hero',
    title: 'Hero',
    fields: [
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'text',
            title: 'Text',
            type: 'string',
        }),
        defineField({
            title: 'Link',
            name: 'link',
            type: 'link',
        }),
    ],
    icon: StarIcon,
	preview: {
		select: {
			title: 'title',
			image: 'image',
		},
		prepare({ title, image }) {
			return {
				title: title ? title : 'Hero',
                subtitle: 'Hero',
				media: image ? image : StarIcon,
			};
		},
	},
})