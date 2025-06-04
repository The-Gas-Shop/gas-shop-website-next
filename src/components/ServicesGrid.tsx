import {
  AspectRatio,
  Card,
  Container,
  Image,
  SimpleGrid,
  Text,
} from "@mantine/core";

const mockdata = [
  {
    title: "Boiler Servicing",
    image:
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "August 18, 2022",
  },
  {
    title: "Fire Servicing",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "August 27, 2022",
  },
  {
    title: "Plumbing",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "September 9, 2022",
  },
  {
    title: "Reapirs",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "September 12, 2022",
  },
];

export function ServicesGrid() {
  const cards = mockdata.map((article) => (
    <Card
      key={article.title}
      p="md"
      radius="md"
      component="a"
      href="#"
      className="border border-solid border-transparent hover:border-(--mantine-color-gray-2) dark:hover:border-(--mantine-color-dark-5) relative hover:z-[1] hover:transform-[scale(1.01)] hover:shadow-(--mantine-shadow-md)"
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image} radius="md" alt="service image" />
      </AspectRatio>
      <Text className="mt-(--mantine-spacing-xs) text-(length:--mantine-font-size-lg) font-medium font-(family-name:--mantine-font-family)">
        {article.title}
      </Text>
    </Card>
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 0, sm: "md" }}>
        {cards}
      </SimpleGrid>
    </Container>
  );
}
