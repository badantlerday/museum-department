/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...index]]/page.jsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { structure } from "./sanity/desk/structure";
import { defaultDocumentNode } from "./sanity/desk/defaultDocumentNode";
import { schema } from "./sanity/schema";

export default defineConfig({
	basePath: "/admin",
	projectId,
	title: "Museum Department",
	dataset,
	// Add and edit the content schema in the './sanity/schema' folder
	schema,
	plugins: [
		deskTool({ structure, defaultDocumentNode }),
		visionTool({ defaultApiVersion: apiVersion }),
		// media(),
	],
});
