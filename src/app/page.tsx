import { CardsCarousel } from "@/components/CardsCarousel/CardsCarousel";
import { ContactCard } from "@/components/ContactCard/ContactCard";
import Maps from "@/components/Maps";
import PageContent from "@/components/PageContent";
import { ServicesGrid } from "@/components/ServicesGrid";
import { getPageBySlug } from "@/lib/api";
import { Image } from "@mantine/core";

export default async function Home() {
  // @ts-expect-error // Unknown type for postFields
  const page: postFields = (await getPageBySlug("/")).fields;

  if (page && page.title)
    return (
      <>
        <Image
          h={300}
          className="object-left rounded-t-2xl"
          alt="Header Image"
          src={
            page.headerImage?.fields.file.url ||
            "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
          }
        />
        <div className="px-10 sm:px-20 py-10 rounded-2xl mt-4">
          <CardsCarousel />
        </div>
        <div className="p-10 sm:p-20">
          <PageContent page={page} />
        </div>
        <ServicesGrid />

        <Maps />
        <ContactCard />
      </>
    );
  return <></>;
}
