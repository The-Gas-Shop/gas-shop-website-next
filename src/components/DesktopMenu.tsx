"use client";
import { Group, useMantineColorScheme } from "@mantine/core";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";

export default function DesktopMenu(props: { items: React.ReactNode }) {
  const { setColorScheme } = useMantineColorScheme();
  return (
    <Group gap={5} visibleFrom="sm">
      {props.items}
      <IconSunFilled
        className="hidden dark:block text-(--mantine-color-dark-0)"
        onClick={() => setColorScheme("light")}
      />
      <IconMoonFilled
        className="dark:hidden text-(--mantine-color-dark-0)"
        onClick={() => setColorScheme("dark")}
      />
    </Group>
  );
}
