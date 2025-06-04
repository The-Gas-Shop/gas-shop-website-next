import { IconChevronDown } from "@tabler/icons-react";
import {
  Center,
  Container,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
} from "@mantine/core";
import Logo from "./Logo";

import { getLinks } from "@/lib/api";
import { link } from "@/lib/types";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

export async function Header() {
  const links: link[] = await getLinks();

  const items = [
    <Link
      key={"/"}
      href={"/"}
      className="block py-2 px-3 leading-none rounded-(--mantine-radius-sm) no-underline text-(--mantine-color-dark-0) hover:bg-(--mantine-color-brand-1) text-(length:--mantine-font-size-sm) font-medium"
    >
      <Center>Home</Center>
    </Link>,
  ].concat(
    links.map((link) => {
      const menuItems = link.children?.map((child) => (
        <MenuItem
          key={`${link.slug}/${child.slug}`}
          className="hover:bg-(--mantine-color-brand-1) text-(--mantine-color-dark-0)"
        >
          <Link href={`/${link.slug}/${child.slug}`}>{child.title}</Link>
        </MenuItem>
      ));
      if (link.slug == "/")
        return <div key="hiddenHome" className="hidden"></div>;

      if (menuItems) {
        return (
          <Menu
            key={link.slug}
            trigger="hover"
            transitionProps={{ exitDuration: 0 }}
            withinPortal
          >
            <MenuTarget>
              <Link
                href={`/${link.slug}`}
                className="block py-2 px-3 leading-none rounded-(--mantine-radius-sm) no-underline text-(--mantine-color-dark-0) hover:bg-(--mantine-color-brand-1) text-(length:--mantine-font-size-sm) font-medium"
              >
                <Center>
                  <span className="mr-1">{link.title}</span>
                  <IconChevronDown size={14} stroke={1.5} />
                </Center>
              </Link>
            </MenuTarget>
            <MenuDropdown className="border-(--mantine-color-brand-2) bg-(--mantine-color-brand-0) text-(--mantine-color-dark-0)">
              {menuItems}
            </MenuDropdown>
          </Menu>
        );
      }

      return (
        <Link
          key={link.slug}
          href={`/${link.slug}`}
          className="block py-2 px-3 leading-none rounded-(--mantine-radius-sm) no-underline text-(--mantine-color-dark-0) hover:bg-(--mantine-color-brand-1) text-(length:--mantine-font-size-sm) font-medium"
        >
          <Center>{link.title}</Center>
        </Link>
      );
    }),
  );

  return (
    <header className="text-white bg-(--mantine-color-brand-0) py-(--mantine-spacing-xs) border-b border-b-solid border-b-(--mantine-color-gray-3) dark:border-b-(--mantine-color-dark-4)">
      <Container size="md">
        <div className="h-14 flex justify-between">
          <Center>
            <Logo className="h-10" />
            <span className="font-sans font-bold text-base">The Gas shop</span>
          </Center>

          <DesktopMenu items={items} />
          <MobileMenu items={items} />
        </div>
      </Container>
    </header>
  );
}
