// Documents
import page from "./documents/page";
import settings from "./documents/settings";
import studio from "./documents/studio";
import person from "./documents/person";
import city from "./documents/city";
import country from "./documents/country";
import project from "./documents/project";
import typeface from "./documents/typeface";
import foundry from "./documents/foundry";
import menu from "./documents/menu";

// Objects
import seo from "./objects/seo";
import siteSeo from "./objects/siteSeo";
import blockContent from "./objects/blockContent";
import link from "./objects/link";

// Arrays
import blocks from "./arrays/blocks";
import menuItems from "./arrays/menuItems";

// Blocks
import hero from "./blocks/hero";
import split from "./blocks/split";
import ondisplay from "./blocks/ondisplay";

export const schemaTypes = [
	// Documents
	page,
	person,
	studio,
	city,
	country,
	typeface,
	foundry,
	project,
	settings,
	menu,
	// Objects
	seo,
	siteSeo,
	blockContent,
	link,
	ondisplay,
	// Arrays
	blocks,
	menuItems,
	// Blocks
	hero,
	split,
];
