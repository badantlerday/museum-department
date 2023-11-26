/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...index]]/page.jsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { presentationTool } from "sanity/presentation";
import { locate } from "/sanity/locate";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { structure } from "./sanity/desk/structure";
import { defaultDocumentNode } from "./sanity/desk/defaultDocumentNode";
import { schema } from "./sanity/schema";

// We recommend configuring the preview location base URL using
// environment variables to support multiple environments
const SANITY_STUDIO_PREVIEW_URL =
	process.env.SANITY_STUDIO_PREVIEW_URL || "http://localhost:3000";

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
		presentationTool({
			// Required: set the base URL to the preview location in the front end
			previewUrl: SANITY_STUDIO_PREVIEW_URL,
			locate,
		}),
		// media(),
	],
});
