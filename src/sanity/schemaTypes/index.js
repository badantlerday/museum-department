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
import category from "./documents/category";
import interview from "./documents/interview";
import advertise from "./documents/advertise";

// Objects
import seo from "./objects/seo";
import siteSeo from "./objects/siteSeo";
import blockContent from "./objects/blockContent";
import blockContentSmall from "./objects/blockContentSmall";
import link from "./objects/link";
import customUrl from "./objects/customUrl";
import gallery from "./objects/gallery";

// Arrays
import blocks from "./arrays/blocks";
import menuItems from "./arrays/menuItems";

// Blocks
import hero from "./blocks/hero";
import split from "./blocks/split";
import ondisplay from "./blocks/ondisplay";
import manifest from "./blocks/manifest";
import exploremore from "./blocks/exploremore";
import callout from "./blocks/callout";
import becomeasupporter from "./blocks/becomeasupporter";
import media from "./blocks/media";
import casemedia from "./blocks/casemedia";
import slideshow from "./blocks/slideshow";

export const schema = {
  types: [
    // Documents
    page,
    person,
    studio,
    city,
    country,
    typeface,
    foundry,
    project,
    interview,
    settings,
    menu,
    category,
    advertise,
    // Objects
    seo,
    gallery,
    siteSeo,
    blockContent,
    blockContentSmall,
    link,
    media,
    // Arrays
    blocks,
    menuItems,
    // Blocks
    hero,
    split,
    ondisplay,
    manifest,
    exploremore,
    callout,
    becomeasupporter,
    casemedia,
    slideshow,
  ],
}
