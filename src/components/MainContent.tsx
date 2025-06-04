import Gallery from "@/components/Gallery";
import PageContent from "@/components/PageContent";
import { getPageBySlug } from "@/lib/api";
import { Image } from "@mantine/core";
import { EntryFieldTypes } from "contentful";

export default async function MainContent(props: { slug: string }) {
  // @ts-expect-error // Unknown type for postFields
  const page: postFields = (await getPageBySlug(props.slug)).fields;

  if (page && page.title)
    return (
      <>
        {page.headerImage && (
          <Image
            className="rounded-br-md rounded-tl-md"
            h={300}
            alt="Header Image"
            src={page.headerImage?.fields.file.url}
          />
        )}
        <div className="py-4 px-8">
          <PageContent page={page} />
        </div>
        {
          page.images && (
            <Gallery
              images={page.images.map(
                // @ts-expect-error // Unknown type for EntryFieldTypes.AssetLink
                (image: EntryFieldTypes.AssetLink) => image.fields.file.url,
              )}
            />
          )
        }
      </>
    );
  return <></>;
}
