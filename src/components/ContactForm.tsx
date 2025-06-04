"use client";
import { hasLength, isEmail, useForm } from "@mantine/form";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useState } from "react";
import { Button, Textarea, TextInput } from "@mantine/core";
export default function ContactForm() {
  const [captchaRepsonse, setCaptchaResponse] = useState<string>("");

  const onHCaptchaChange = (token: string) => {
    console.log(captchaRepsonse);
    setCaptchaResponse(token);
  };

  const form = useForm({
    mode: "controlled",
    initialValues: {
      name: "",
      email: "",
      message: "",
    },

    validate: {
      name: hasLength({ min: 3 }, "Please enter your name"),
      email: isEmail("Invalid email"),
      message: hasLength({ min: 10 }, "Please enter a longer message"),
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: typeof form.values) {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
        name: values.name,
        email: values.email,
        message: values.message,
      }),
    });
    const result = await response.json();
    if (result.success) {
      console.log(result);
    }
    console.log(values);
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        {...form.getInputProps("name")}
        label="Name"
        placeholder="Name"
        className="my-4"
      />
      <TextInput
        {...form.getInputProps("email")}
        label="Email"
        placeholder="Email"
        className="my-4"
      />
      <Textarea
        {...form.getInputProps("message")}
        label="Message"
        placeholder="Message"
        className="my-4"
        autosize
        minRows={4}
      />

      <div className="py-4">
        <HCaptcha
          sitekey={`${process.env.NEXT_PUBLIC_HCAPTCHA_KEY}`}
          reCaptchaCompat={false}
          onVerify={onHCaptchaChange}
        />
      </div>
      <Button className="w-full md:w-auto my-4" type="submit">
        Submit
      </Button>
    </form>
  );
}
