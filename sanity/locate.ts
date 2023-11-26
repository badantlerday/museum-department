// locate.ts
import { DocumentLocationResolver } from "sanity/presentation";
import { map } from "rxjs";

// Pass 'context' as the second argument
export function locate(params, context): DocumentLocationResolver {
  // Set up locations for post documents
  if (params.type === "studio") {
    // Subscribe to the latest slug and title
    const doc$ = context.documentStore.listenQuery(
      `*[_id == $id][0]{slug,name}`,
      params,
      { perspective: "previewDrafts" } // returns a draft article if it exists
    );
    // Return a streaming list of locations
    return doc$.pipe(
      map((doc) => {
        // If the document doesn't exist or have a slug, return null
        if (!doc || !doc.slug?.current) {
          return null;
        }
        return {
          locations: [
            {
              title: doc.name || "Untitled",
              href: `/studio/${doc.slug.current}`,
            },
            {
              title: "Studios",
              href: "/studios",
            },
          ],
        };
      })
    );
  }
  return null;
}