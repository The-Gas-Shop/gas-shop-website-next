import type { Metadata } from "next";
import {
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  ColorSchemeScript,
  Container,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import theme from "./theme";
import "./globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Gas Shop (Felixstowe) Limited",
  description: "Gas, Oil and Fire Services in Suffolk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="The Gas Shop" />
        <link rel="manifest" href="/site.webmanifest" />
        <ColorSchemeScript />
      </head>
      <body className="antialiased">
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <AppShell
            header={{ height: 77 }}
            footer={{ height: 72 }}
            padding="md"
          >
            <AppShellHeader>
              <Header />
            </AppShellHeader>
            <AppShellMain>
              <Container
                size={"lg"}
                className="bg-slate-200 dark:bg-(--mantine-color-brand-1) pb-4 px-0 rounded-2xl"
              >
                {children}
              </Container>
            </AppShellMain>
            <AppShellFooter>
              <Footer />
            </AppShellFooter>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
