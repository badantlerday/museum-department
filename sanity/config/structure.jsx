import { Iframe } from 'sanity-plugin-iframe-pane';
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
      PersonsItem(S),
      CountriesItem(S),
      CitysItem(S),
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
      );

    const SettingsItem = (S) =>
  S.listItem()
    .title('Site Settings')
    .icon(CogIcon)
    .child(
      S.document().id('settings').schemaType('settings').documentId('settings').title('Site Settings')
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
      .icon(ImagesIcon)
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

export const defaultDocumentNode = (S, props) => {
  const { schemaType } = props;

  if (schemaType === "page") {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: (doc) => doc?.slug?.current !== 'home'
            ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/preview?page=${doc.slug.current}`
            : `${process.env.NEXT_PUBLIC_SITE_URL}/api/preview`,
        })
        .title('Preview'),
    ]);
  }

  if (schemaType === "studio") {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: (doc) => doc?.slug?.current !== 'home'
            ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/preview?page=studio/${doc.slug.current}`
            : `${process.env.NEXT_PUBLIC_SITE_URL}/api/preview`,
        })
        .title('Preview'),
    ]);
  }

  return S.document().views([S.view.form()]);
};
