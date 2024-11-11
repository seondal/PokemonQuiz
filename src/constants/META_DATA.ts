import { Metadata } from "next";
import { GOOGLE_ADSENSE, GOOGLE_SEARCH, NAVER_SEARCH } from "./ENV";

export const META_DATA: Metadata = {
  title: {
    default: `포켓몬 종족값 퀴즈`,
    template: `포켓몬 퀴즈 | %s`,
  },
  description: "포켓몬 종족값 맞추기 퀴즈",
  openGraph: {
    title: "포켓몬 종족값 퀴즈",
    description: "포켓몬 종족값 맞추기 퀴즈",
    images: ["/meta/og.png"],
  },
  icons: {
    icon: "/meta/favicon.ico",
    apple: "/meta/favicon.ico",
  },
  verification: {
    google: GOOGLE_SEARCH,
  },
  other: {
    "naver-site-verification": NAVER_SEARCH,
    "google-adsense-account": GOOGLE_ADSENSE,
  },
};
