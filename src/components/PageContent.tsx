"use client";
import { postFields } from "@/lib/types";
import { Title } from "@mantine/core";
import { Text } from "@mantine/core";

export default function PageContent(props: { page: postFields }) {
  return (
    <>
      <section>
        <Title order={1}>{props.page.title}</Title>
      </section>
      <section>
        {props.page.body.content.map((item, index) => {
          if (item.nodeType === "paragraph") {
            return (
              <Text className="py-4" size="lg" key={index}>
                {item.content.map((content) => content.value).join("")}
              </Text>
            );
          } else if (item.nodeType === "heading-1") {
            return (
              <Title order={2} key={index}>
                {item.content.map((content) => content.value).join("")}
              </Title>
            );
          } else if (item.nodeType === "heading-2") {
            return (
              <Title order={3} key={index}>
                {item.content.map((content) => content.value).join("")}
              </Title>
            );
          } else {
            return null;
          }
        })}
      </section>
    </>
  );
}
