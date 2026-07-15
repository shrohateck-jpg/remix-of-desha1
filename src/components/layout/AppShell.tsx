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

const NAV = [
  { to: "/home", label: "الرئيسية", icon: Home },
  { to: "/challenge/active", label: "التحدي", icon: Swords },
  { to: "/history", label: "التاريخ", icon: ScrollText },
  { to: "/calendar", label: "التقويم", icon: CalendarDays },
  { to: "/stats", label: "الإحصائيات", icon: BarChart3 },
  { to: "/profile", label: "البروفايل", icon: User },
  { to: "/how-to-play", label: "إزاي ألعب؟", icon: HelpCircle },
  { to: "/settings", label: "الإعدادات", icon: Settings },
] as const;
const MOBILE_NAV = NAV.slice(0, 5);

export function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const signOut = async () => {
    await supabase.auth.signOut();
    router.navigate({ to: "/" });
  };

  return (
    <div className="min-h-dvh" dir="rtl">
      <MagicBackground />
      <aside className="glass-strong fixed inset-y-4 right-4 z-40 hidden w-64 flex-col rounded-3xl p-3 md:flex">
        <Link to="/home" className="flex items-center gap-3 rounded-2xl px-3 py-4">
          <span className="gradient-magic flex size-11 items-center justify-center rounded-2xl font-display text-xl font-black text-primary-foreground">
            د
          </span>
          <div>
            <span className="block font-display text-xl font-bold">ديشا</span>
            <span className="text-[10px] font-bold tracking-wider text-muted-foreground">
              CHALLENGE MODE
            </span>
          </div>
        </Link>
        <div className="mx-3 my-3 h-px bg-border" />
        <nav className="flex flex-1 flex-col gap-1" aria-label="التنقل الرئيسي">
          {NAV.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeProps={{ className: "active" }}
              className="group flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-muted-foreground transition-all hover:bg-foreground/5 hover:text-foreground [&.active]:bg-primary/14 [&.active]:text-primary-glow [&.active]:shadow-[inset_-3px_0_0_var(--color-primary)]"
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="rounded-2xl border border-primary/15 bg-primary/5 p-3">
          <div className="flex items-center gap-2 text-xs font-bold text-primary-glow">
            <Sparkles size={15} /> خليك مستمر
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            كل تحدي بيقربك من المستوى الجاي.
          </p>
        </div>
        <button
          onClick={signOut}
          className="mt-2 flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut size={18} /> خروج
        </button>
      </aside>

      <main className="px-4 pb-28 pt-6 md:mr-72 md:pb-12 md:pl-8 md:pt-8">
        <div className="mx-auto w-full max-w-5xl">{children}</div>
      </main>

      <nav
        className="glass-strong fixed inset-x-3 bottom-3 z-40 flex items-center justify-around rounded-3xl px-2 py-2 md:hidden"
        aria-label="التنقل الرئيسي للموبايل"
      >
        {MOBILE_NAV.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeProps={{ className: "active" }}
            className="flex min-h-12 min-w-12 flex-col items-center justify-center gap-0.5 rounded-2xl px-2 text-[10px] font-semibold text-muted-foreground transition-all [&.active]:bg-primary/12 [&.active]:text-primary-glow"
          >
            <Icon size={20} />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
