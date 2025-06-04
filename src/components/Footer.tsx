"use client";
import { Anchor, Center, Container, Group } from "@mantine/core";
import Logo from "./Logo";

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Careers" },
];

export function Footer() {
  const items = links.map((link) => (
    <Anchor<"a">
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className="bg-(--mantine-color-brand-0) text-(--mantine-color-dark-0)">
      <Container
        className={
          "flex items-center justify-between py-(--mantine-spacing-md) [@media(max-width:--mantine-breakpoint-xs)]:mt-(--mantine-spacing-md)"
        }
      >
        <Center>
          <Logo className="h-10" />
          <span className="font-sans font-bold text-base">The Gas shop</span>
        </Center>
        <Group className="[@media(max-width:--mantine-breakpoint-xs)]:mt-(--mantine-spacing-md)">
          {items}
        </Group>
      </Container>
    </div>
  );
}
