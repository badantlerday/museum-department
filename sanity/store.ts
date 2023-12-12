import { createClient } from "@sanity/client/stega";
import { createQueryStore } from "@sanity/react-loader";

export const STUDIO_ORIGIN =
  process.env.NEXT_PUBLIC_STUDIO_ORIGIN || "http://localhost:3000";

// Only enable Stega encoded strings in preview
export const STEGA_ENABLED = process.env.NODE_ENV !== "production";

// Configure the client for production
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-11-01",
  useCdn: true,
  perspective: "published",

  // The 'stega' object groups stega-specific options
  stega: {
    enabled: STEGA_ENABLED,
    studioUrl: STUDIO_ORIGIN,

    // High fidelity control over what strings to stega-encode
    // filter: ({sourcePath, sourceDocument, resultPath, value, filterDefault}) => boolean
    // Rich debug information
    // logger: console,
  },
});

// Export the loader utilities
export const { loadQuery, useQuery, useLiveMode } = createQueryStore({
    client: false,
  ssr: true,
});