import { defineField, defineType } from 'sanity';
import { UlistIcon } from '@sanity/icons';

export default defineType({
	name: 'menu',
	title: 'Menu',
	type: 'document',
	icon: UlistIcon,
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: Rule => Rule.required()
		}),
		defineField({
			name: 'menuItems',
			title: 'Menu items',
			type: 'menuItems'
		}),
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare({ title }) {
			return {
				title: title,
			};
		},
	},
});
