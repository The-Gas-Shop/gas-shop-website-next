import { getLinks } from "@/lib/api";
import MainContent from "@/components/MainContent";
import ContactForm from "@/components/ContactForm";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; service: string }>;
}) {
  const { service } = await params;

  return (
    <div className="flex flex-row">
      <div className="md:basis-2/3">
        <main className="flex flex-col">
          <MainContent slug={service} />
        </main>
      </div>
      <div className="hidden sm:flex sm:basis-1/3 p-4">
        <aside>
          <div className="sticky top-20">
            <ContactForm />
          </div>
        </aside>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const pages = await getLinks();
  const allPages: {
    category: string;
    service: string;
  }[] = [];

  pages.forEach((page) => {
    if (page.children && page.children.length > 0) {
      page.children.forEach((child) => {
        allPages.push({
          category: page.slug,
          service: child.slug,
        });
      });
    }
  });
  return allPages;
}
