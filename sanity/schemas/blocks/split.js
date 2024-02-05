import { defineField, defineType } from 'sanity';
import { SplitVerticalIcon } from '@sanity/icons'

export default defineType({
    type: 'object',
    name: 'split',
    title: 'Split',
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
            title: "Image alignment",
            name: "imageAlignment",
            type: "string",
            options: {
                list: [
                    { title: "Left", value: "left" },
                    { title: "Right", value: "right" }
                ],
                layout: "radio",
                direction: "horizontal"
            },
            initialValue: "left"
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'text',
            title: 'Text',
			type: 'blockContent',
        }),
    ],
    icon: SplitVerticalIcon,
	preview: {
		select: {
			title: 'title',
			image: 'image',
		},
		prepare({ title, image }) {
			return {
				title: title ? title : 'Split',
                subtitle: 'Split',
				media: image ? image : SplitVerticalIcon,
			};
		},
	},
})