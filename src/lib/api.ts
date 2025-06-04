import { createClient, EntryFieldTypes } from "contentful";
import { link, ProductEntrySkeleton } from "./types";

const client = createClient({
  space: `${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE}`,
  accessToken: `${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
});

function extractChildren(
  entry: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<ProductEntrySkeleton>>,
): link[] {
  // @ts-expect-error // TypeScript does not recognize the structure of the entry
  return entry.map((item) => {
    if (item.fields.children)
      return {
        title: item.fields.title,
        slug: item.fields.slug,
        children: extractChildren(item.fields.children),
        id: item.sys.id,
      };
    return {
      title: item.fields.title,
      slug: item.fields.slug,
      id: item.sys.id,
    };
  });
}

export async function getReviews() {
  return fetch(
    `https://places.googleapis.com/v1/places/${process.env.NEXT_PUBLIC_GOOGLE_PLACES_ID}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": `${process.env.NEXT_PUBLIC_GOOGLE_API}`,
        "X-Goog-FieldMask": "reviews",
      },
    },
  );
}

export async function getPageBySlug(slug: string) {
  const page = await client.getEntries<ProductEntrySkeleton>({
    content_type: "page",
    "fields.slug": slug,
  });
  console.log(page);
  return page.items[0];
}

export async function getLinks() {
  const entries = await client.getEntries<ProductEntrySkeleton>({
    order: ["fields.title"],
    content_type: "page",
  });

  const links: link[] = [];
  entries.items.forEach((entry) => {
    if (entry.fields.isParent)
      if (entry.fields.children) {
        links.push({
          title: entry.fields.title,
          slug: entry.fields.slug,
          // @ts-expect-error // TypeScript does not recognize the structure of the entry
          children: extractChildren(entry.fields.children),
          id: entry.sys.id,
        });
      } else {
        links.push({
          title: entry.fields.title,
          slug: entry.fields.slug,
          id: entry.sys.id,
        });
      }
  });
  return links;
}
