import { HomeIcon, CogIcon, DashboardIcon } from "@sanity/icons";
export const structure = (S) =>
	S.list()
		.title("Content")
		.items([
			S.listItem()
				.title("Home")
				.icon(HomeIcon)
				.child(S.document().schemaType("home").documentId("home")),
			S.listItem()
				.title("Settings")
				.icon(CogIcon)
				.child(S.document().schemaType("settings").documentId("settings")),
			S.listItem()
				.icon(DashboardIcon)
				.title("On Display")
				.child(
					S.documentList()
						.filter('_type == "project" && ondisplay == true')
						.title("On Display")
				),
			S.divider(),
			...S.documentTypeListItems().filter(
				(item) => !["home", "settings", "media.tag"].includes(item.getId())
			),
		]);
