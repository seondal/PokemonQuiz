import { DEVELOPER } from "@/constants/ENV";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Header");

  return (
    <nav>
      <h1>{t("title")}</h1>
      <a href={DEVELOPER}>{t("developer")}</a>
    </nav>
  );
}
