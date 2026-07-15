import { Languages } from "lucide-react";
import { locales, type Locale, useI18n } from "@/lib/i18n";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  return (
    <label className="glass flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-bold">
      <Languages size={17} aria-hidden="true" />
      <span className={compact ? "sr-only" : "hidden lg:inline"}>{t("language")}</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        aria-label={t("language")}
        className="max-w-28 cursor-pointer bg-transparent text-foreground outline-none"
      >
        {locales.map(([id, name]) => (
          <option key={id} value={id} className="bg-background text-foreground">
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}
