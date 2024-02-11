import { defineField, defineType } from 'sanity';
import { EarthGlobeIcon, DocumentIcon } from '@sanity/icons';

export default defineType({
	title: 'Link',
	name: 'link',
	type: 'object',
	options: {
		collapsible: true,
	},
	fields: [
    defineField({
			name: 'type',
			title: 'Link type',
			type: 'string',
			initialValue: 'internal',
			options: {
				list: [
					// {
					// 	title: 'Internal page',
					// 	value: 'internal',
					// },
					{
						title: 'Relative path',
						value: 'relative',
					},
					{
						title: 'External URL',
						value: 'external',
					},
					{
						title: 'Fragment',
						value: 'fragment',
					},
				],
				layout: 'radio',
				direction: 'horizontal',
			},
		}),
   		// defineField({
		// 	name: 'internal',
		// 	title: 'Internal page',
		// 	type: 'reference',
		// 	to: [
		// 		{ type: 'page' },
		// 	],
		// 	hidden: ({ parent }) => parent?.type !== 'internal',
		// }),
    	defineField({
			name: 'relative',
			title: 'Relative path',
			type: 'string',
			hidden: ({ parent }) => parent?.type !== 'relative',
		}),
		defineField({
			name: 'external',
			title: 'External URL',
			type: 'url',
			hidden: ({ parent }) => parent?.type !== 'external',
		}),
		defineField({
			name: 'fragment',
			title: 'Fragment',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((fragment) => {
					if (!fragment) return true;
					const regex = /^$|^#[a-zA-Z_][a-zA-Z0-9\-_]*$/;
					if (regex.test(fragment)) return true;
					return 'Invalid fragment: Only numbers, letters and dashes are permitted. Must start with a "#" symbol.';
				}),
			description: 'Use fragments to link to a specific section which has a block id. Example fragment: "#contact"',
			hidden: ({ parent }) => parent?.type !== 'fragment',
		}),
		defineField({
			name: 'text',
			title: 'Link text',
			type: 'string',
			description: 'Leave empty to show page title if type is internal.',
		}),
	],
	preview: {
		select: {
			type: 'type',
			relative: 'relative',
			external: 'external',
			text: 'text',
			pageTitle: 'internal.title',
			pageSlug: 'internal.slug.current',
			pageType: 'internal._type',
		},
		prepare(selection) {
			let url = '';
			let title = '';

			if (selection.type === 'internal' && selection.pageType) {
				url = '/' + selection.pageSlug;
				title = selection.pageTitle;
			}

			if (selection.type === 'external') {
				url = selection.external ?? '';
				title = selection.text ?? '';
			}

			if (selection.type === 'relative') {
				url = selection.relative ?? '';
				title = selection.text ?? '';
			}

			const media = selection.type === 'external' ? EarthGlobeIcon : DocumentIcon;

			return {
				title: title,
				subtitle: url,
				media: media,
			};
		},
	},
});


