import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import LOCALES from "@/constants/LOCALE";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: "en",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
