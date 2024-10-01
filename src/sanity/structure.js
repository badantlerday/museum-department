// https://www.sanity.io/docs/structure-builder-cheat-sheet
// export const structure = (S) =>
//   S.list()
//     .title('Content')
//     .items(S.documentTypeListItems())

import {
  DashboardIcon,
	DocumentsIcon,
  EarthAmericasIcon,
  BookIcon,
  ImagesIcon,
  CaseIcon,
  PinIcon,
  BlockContentIcon,
	CogIcon,
  UsersIcon,
	UlistIcon,
  TagsIcon,
  CommentIcon,
  CalendarIcon,
  ProjectsIcon
} from '@sanity/icons';

export const structure = (S, _context) =>
  S.list()
    .title('Content')
    .items([
      OnDisplayItem(S),
      S.divider(),
      StudiosItem(S),
      ProjectsItem(S),
      FoundriesItem(S),
      TypefacesItem(S),
      InterviewsItem(S),
      PersonsItem(S),
      CountriesItem(S),
      CitysItem(S),
      CategoriesItem(S),
      AdrvertiseItem(S),
      S.divider(),
      PagesItem(S),
      MenusItem(S),
      SettingsItem(S),
    ]);

    const OnDisplayItem = (S) =>
    S.listItem()
      .title('On Display')
      .icon(DashboardIcon)
      .child(
        S.documentList()
          .filter('_type == "project" && ondisplay == true')
          .title("On Display")
          .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
      );

    const SettingsItem = (S) =>
  S.listItem()
    .title('Site Settings')
    .icon(CogIcon)
    .child(
      S.document().id('settings').schemaType('settings').documentId('settings').title('Site Settings')
    );

    const InterviewsItem = (S) =>
    S.listItem()
      .title('Interviews')
      .icon(CommentIcon)
      .id('interviews')
      .child(
        S.documentTypeList('interview')
          .title('Interviews')
      );


      const AdrvertiseItem = (S) =>
      S.listItem()
        .title('Advertise')
        .icon(CalendarIcon)
        .id('advertise')
        .child(
          S.documentTypeList('advertise')
            .title('Advertise')
        );

const CitysItem = (S) =>
  S.listItem()
    .title('Citys')
    .icon(PinIcon)
    .id('citys')
    .child(
      S.documentTypeList('city')
        .title('Citys')
    );

    const CountriesItem = (S) =>
    S.listItem()
      .title('Countries')
      .icon(EarthAmericasIcon)
      .id('countries')
      .child(
        S.documentTypeList('country')
          .title('Countries')
      );

const TypefacesItem = (S) =>
  S.listItem()
    .title('Typefaces')
    .icon(BlockContentIcon)
    .id('typefaces')
    .child(
      S.documentTypeList('typeface')
        .title('Typefaces')
    );

const FoundriesItem = (S) =>
  S.listItem()
    .title('Foundries')
    .icon(BookIcon)
    .id('foundries')
    .child(
      S.documentTypeList('foundry')
        .title('Foundries')
    );

const PagesItem = (S) =>
  S.listItem()
    .title('Pages')
    .icon(DocumentsIcon)
    .id('pages')
    .child(
      S.documentTypeList('page')
        .title('Pages')
    );

const ProjectsItem = (S) =>
    S.listItem()
      .title('Projects')
      .icon(ProjectsIcon)
      .id('projects')
      .child(
        S.documentTypeList('project')
          .title('Projects')
      );

const PersonsItem = (S) =>
    S.listItem()
      .title('Persons')
      .icon(UsersIcon)
      .id('persons')
      .child(
        S.documentTypeList('person')
          .title('Persons')
      );

const StudiosItem = (S) =>
    S.listItem()
      .title('Studios')
      .icon(CaseIcon)
      .id('studios')
      .child(
        S.documentTypeList('studio')
          .title('Studios')
      );

const MenusItem = (S) =>
  S.listItem()
    .title('Menus')
    .icon(UlistIcon)
    .id('menus')
    .child(
      S.documentTypeList('menu')
        .title('Menus')
    );
  
    const CategoriesItem = (S) =>
  S.listItem()
    .title('Categories')
    .icon(TagsIcon)
    .id('categories')
    .child(
      S.documentTypeList('category')
        .title('Categories')
    );