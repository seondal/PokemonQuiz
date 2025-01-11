import "@picocss/pico";
import "@/style/globals.css";
import "@/style/theme.css";

import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { DEVELOPER, GOOGLE_ADSENSE, GOOGLE_ANALYITICS } from "@/constants/ENV";
import { META_DATA } from "@/constants/META_DATA";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/Header";

export const metadata = META_DATA;

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  console.log("🚀 ~ messages:", messages);

  return (
    <html lang="kor">
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${GOOGLE_ADSENSE}`}
          crossOrigin="anonymous"></Script>
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <header>
            <Header />
          </header>
          <main className="container-fluid">{children}</main>
          <GoogleAnalytics gaId={GOOGLE_ANALYITICS} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
