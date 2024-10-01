import { defineArrayMember, defineType } from 'sanity';

export default defineType({
	title: 'Menu items',
	name: 'menuItems',
	type: 'array',
	of: [
		defineArrayMember({
			title: 'Link',
			type: 'link',
		}),
	]
});
