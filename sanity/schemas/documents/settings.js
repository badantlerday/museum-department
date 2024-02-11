import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons';

export default defineType({
	name: 'settings',
	title: 'Settings',
	type: 'document',
	icon: CogIcon,
	groups: [
		{ title: 'Global', name: 'global', default: true },
		{ title: 'Header', name: 'header' },
		{ title: 'Footer', name: 'footer' },
		{ title: 'SEO', name: 'seo' },
	],
	fields: [
		defineField({
			name: 'homePage',
			title: 'Home page',
			type: 'reference',
			group: 'global',
			to: [{ type: 'page' }],
			validation: Rule => Rule.required()
		}),
		defineField({
			name: 'headerMenu',
			title: 'Header menu',
			type: 'reference',
			group: 'header',
			to: [{ type: 'menu' }]
		}),
		defineField({
			name: 'footerMenu',
			title: 'Footer menu',
			type: 'reference',
			group: 'footer',
			to: [{ type: 'menu' }]
		}),
		defineField({
			title: 'Site SEO / Fallback SEO',
			name: 'siteSeo',
			type: 'siteSeo',
			group: 'seo',
		}),
	],
	preview: {
		prepare() {
			return {
				title: 'Settings',
			};
		},
	},
});
