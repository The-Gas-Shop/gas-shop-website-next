import { IconAt, IconMapPin, IconPhone, IconSun } from "@tabler/icons-react";
import { Box, Stack, Text } from "@mantine/core";
import classes from "./ContactIcons.module.css";

interface ContactIconProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  icon: typeof IconSun;
  title: React.ReactNode;
  description: Array<React.ReactNode>;
}

function ContactIcon({
  icon: Icon,
  title,
  description,
  ...others
}: ContactIconProps) {
  return (
    <div className={classes.wrapper} {...others}>
      <Box mr="md">
        <Icon size={24} />
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        {description.map((desc, key) => (
          <Text className={classes.description} key={key}>
            {desc}
          </Text>
        ))}
      </div>
    </div>
  );
}

const MOCKDATA = [
  { title: "Email", description: ["info@thegasshop.co.uk"], icon: IconAt },
  { title: "Phone", description: ["01394 670903"], icon: IconPhone },
  {
    title: "Address",
    description: ["14-16 Orwell Road", "Felixstowe", "IP11 7HD"],
    icon: IconMapPin,
  },
  {
    title: "Working hours",
    description: [
      "Mon-Fri - 07:30 - 17:00",
      "Sat - 08:30-14:00",
      "Sun & Bank Hol - Closed",
    ],
    icon: IconSun,
  },
];

export function ContactIconsList() {
  const items = MOCKDATA.map((item, index) => (
    <ContactIcon key={index} {...item} />
  ));
  return <Stack>{items}</Stack>;
}
