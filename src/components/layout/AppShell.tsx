import { Link, useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Home,
  Swords,
  ScrollText,
  CalendarDays,
  BarChart3,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MagicBackground } from "@/components/game/MagicBackground";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

const NAV = [
  { to: "/home", label: "home", icon: Home },
  { to: "/challenge/active", label: "challenge", icon: Swords },
  { to: "/history", label: "history", icon: ScrollText },
  { to: "/calendar", label: "calendar", icon: CalendarDays },
  { to: "/stats", label: "stats", icon: BarChart3 },
  { to: "/profile", label: "profile", icon: User },
  { to: "/how-to-play", label: "howTo", icon: HelpCircle },
  { to: "/settings", label: "settings", icon: Settings },
] as const;
const MOBILE_NAV = NAV.slice(0, 5);

export function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { t, dir } = useI18n();
  const signOut = async () => {
    await supabase.auth.signOut();
    router.navigate({ to: "/" });
  };
  return (
    <div className="min-h-dvh">
      <MagicBackground />
      <aside className="glass-strong fixed inset-y-4 end-4 z-40 hidden w-64 flex-col rounded-3xl p-3 md:flex">
        <Link to="/home" className="flex items-center gap-3 rounded-2xl px-3 py-4">
          <span className="gradient-magic flex size-11 items-center justify-center rounded-2xl font-display text-xl font-black text-primary-foreground">
            D
          </span>
          <div>
            <span className="block font-display text-xl font-bold">{t("brand")}</span>
            <span className="text-[10px] font-bold tracking-wider text-muted-foreground">
              CHALLENGE MODE
            </span>
          </div>
        </Link>
        <LanguageSwitcher />
        <div className="mx-3 my-3 h-px bg-border" />
        <nav className="flex flex-1 flex-col gap-1" aria-label={t("navMain")}>
          {NAV.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeProps={{ className: "active" }}
              className="group flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-muted-foreground transition-all hover:bg-foreground/5 hover:text-foreground [&.active]:bg-primary/14 [&.active]:text-primary-glow"
            >
              <Icon size={18} />
              <span>{t(label)}</span>
            </Link>
          ))}
        </nav>
        <div className="rounded-2xl border border-primary/15 bg-primary/5 p-3">
          <div className="flex items-center gap-2 text-xs font-bold text-primary-glow">
            <Sparkles size={15} /> {t("keepGoing")}
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{t("nextLevel")}</p>
        </div>
        <button
          onClick={signOut}
          className="mt-2 flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut size={18} /> {t("logout")}
        </button>
      </aside>
      <main
        className={`px-4 pb-28 pt-6 md:pb-12 md:pt-8 ${dir === "rtl" ? "md:mr-72 md:pl-8" : "md:ml-72 md:pr-8"}`}
      >
        <div className="mx-auto w-full max-w-5xl">{children}</div>
      </main>
      <div className="fixed end-3 top-3 z-40 md:hidden">
        <LanguageSwitcher compact />
      </div>
      <nav
        className="glass-strong fixed inset-x-3 bottom-3 z-40 flex items-center justify-around rounded-3xl px-2 py-2 md:hidden"
        aria-label={t("navMobile")}
      >
        {MOBILE_NAV.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeProps={{ className: "active" }}
            className="flex min-h-12 min-w-12 flex-col items-center justify-center gap-0.5 rounded-2xl px-2 text-[10px] font-semibold text-muted-foreground transition-all [&.active]:bg-primary/12 [&.active]:text-primary-glow"
          >
            <Icon size={20} />
            {t(label)}
          </Link>
        ))}
      </nav>
    </div>
  );
}
