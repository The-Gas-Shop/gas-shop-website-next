import { Paper, Text } from "@mantine/core";
import { ContactIconsList } from "./ContactIcons";
import classes from "./ContactCard.module.css";
import ContactForm from "../ContactForm";

export function ContactCard() {
  return (
    <Paper radius="lg">
      <div className="flex bg-slate-200 dark:bg-(--mantine-color-brand-1) p-1 mt-5 [@media(max-width:48em)]:flex-col">
        <div className={classes.contacts}>
          <Text fz="lg" fw={700} className={classes.title}>
            Contact information
          </Text>

          <ContactIconsList />
        </div>

        <div className={classes.form}>
          <Text fz="lg" fw={700} className={classes.title}>
            Get in touch
          </Text>

          <div className={classes.fields}>
            <ContactForm />
          </div>
        </div>
      </div>
    </Paper>
  );
}
