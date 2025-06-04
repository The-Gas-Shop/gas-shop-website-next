"use client";
import { Burger, Center, Drawer, useMantineColorScheme } from "@mantine/core";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";
import { useState } from "react";

export default function MobileMenu(props: { items: React.ReactNode }) {
  const [opened, setOpened] = useState(false);
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Center className="flex sm:hidden">
      <Drawer.Root
        opened={opened}
        onClose={() => setOpened(false)}
        offset={8}
        position="right"
        radius="md"
      >
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <div className="flex items-center justify-between">
                <span className="flex">Menu</span>
              </div>
            </Drawer.Title>
            <div className="flex items-center">
              <IconSunFilled
                className="hidden dark:block"
                onClick={() => setColorScheme("light")}
              />
              <IconMoonFilled
                className="dark:hidden"
                onClick={() => setColorScheme("dark")}
              />
              <Drawer.CloseButton />
            </div>
          </Drawer.Header>
          <Drawer.Body>{props.items}</Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
      <Burger opened={opened} onClick={() => setOpened(true)} size="sm" />
    </Center>
  );
}
