import "./globals.css";
import "@picocss/pico";

import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { DEVELOPER, GOOGLE_ADSENSE, GOOGLE_ANALYITICS } from "@/constants/ENV";
import { META_DATA } from "@/constants/META_DATA";

export const metadata = META_DATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kor">
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${GOOGLE_ADSENSE}`}
          crossOrigin="anonymous"></Script>
      </head>
      <body>
        <header></header>
        <main>{children}</main>
        <GoogleAnalytics gaId={GOOGLE_ANALYITICS} />
        <footer>
          <div>문의, 기능제안, 오류신고 편하게 해주세요 !</div>
          <a href={DEVELOPER}>이 사이트 만든 사람</a>
        </footer>
      </body>
    </html>
  );
}
