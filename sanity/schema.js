import { blockContent } from "./schemas/blockContent";
import { category } from "./schemas/category";
import { post } from "./schemas/post";
import { author } from "./schemas/author";
import { studio } from "./schemas/studio";
import { home } from "./schemas/singletons/home";
import { settings } from "./schemas/singletons/settings";
import { project } from "./schemas/project";
import { foundry } from "./schemas/foundry";
import { typeface } from "./schemas/typeface";
import { interview } from "./schemas/interview";
import { person } from "./schemas/person";
import { country } from "./schemas/country";
import { city } from "./schemas/city";
import { seo } from "./schemas/objects/seo";

export const schema = {
	types: [
		studio,
		home,
		// post,
		project,
		foundry,
		typeface,
		interview,
		person,
		country,
		city,
		settings,
		blockContent,
		// seo,
	],
};
