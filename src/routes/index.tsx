import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Camera, Flame, ShieldCheck, Sparkles, Swords } from "lucide-react";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";
import { Desha } from "@/components/game/Desha";
import { MagicBackground } from "@/components/game/MagicBackground";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "ديشا — اتحدى نفسك" },
      { name: "description", content: "اختبر معلوماتك واستمتع بأقوى تجربة تحدي." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const router = useRouter();
  const { t } = useI18n();
  const authRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authVisible, setAuthVisible] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.navigate({ to: "/home" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") router.navigate({ to: "/home" });
    });
    return () => sub.subscription.unsubscribe();
  }, [router]);

  const signIn = async () => {
    setLoading(true);
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError(t("signInError"));
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    router.navigate({ to: "/home" });
  };

  const revealAuth = () => {
    setAuthVisible(true);
    window.setTimeout(
      () => authRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
      50,
    );
  };

  return (
    <main className="relative min-h-dvh overflow-hidden px-5 pb-10 pt-5 sm:px-8 lg:px-12">
      <MagicBackground />
      <header className="mx-auto flex max-w-7xl items-center justify-between">
        <a
          href="#hero"
          className="flex items-center gap-3 rounded-full"
          aria-label={t("homeLabel")}
        >
          <span className="gradient-magic flex size-10 items-center justify-center rounded-2xl font-display text-xl font-black text-primary-foreground shadow-lg">
            د
          </span>
          <span className="font-display text-xl font-bold">ديشا</span>
        </a>
        <div className="flex items-center gap-2">
          <LanguageSwitcher compact />
          <button
            onClick={revealAuth}
            className="glass rounded-full px-5 py-2.5 text-sm font-bold transition-colors hover:text-primary-glow"
          >
            {t("login")}
          </button>
        </div>
      </header>

      <section
        id="hero"
        className="mx-auto grid min-h-[calc(100dvh-5rem)] max-w-7xl items-center gap-12 py-12 lg:grid-cols-[1.05fr_.95fr] lg:py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="flex flex-col items-start"
        >
          <div className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-primary-glow">
            <Sparkles size={16} /> {t("heroBadge")}
          </div>
          <h1 className="text-balance font-display text-5xl font-black leading-[1.16] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg font-semibold leading-relaxed text-muted-foreground sm:text-xl">
            {t("heroSubtitle")}
          </p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("heroBody")}
          </p>
          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button
              onClick={revealAuth}
              className="premium-button gradient-magic glow-strong flex min-h-14 items-center justify-center gap-3 rounded-2xl px-8 text-lg font-black text-primary-foreground"
            >
              {t("start")} <ArrowLeft className="rtl:rotate-0 ltr:rotate-180" size={20} />
            </button>
            <a
              href="#features"
              className="glass flex min-h-14 items-center justify-center rounded-2xl px-7 text-base font-bold"
            >
              {t("discover")}
            </a>
          </div>
          <div id="features" className="mt-10 grid w-full max-w-2xl grid-cols-3 gap-3">
            {[
              { icon: Swords, value: "+100", label: t("challenges") },
              { icon: Camera, value: t("smart"), label: t("photoProof") },
              { icon: Flame, value: t("daily"), label: t("streakXp") },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="premium-card rounded-2xl p-4">
                <Icon className="mb-3 text-primary-glow" size={20} />
                <strong className="block text-lg">{value}</strong>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="relative flex min-h-[28rem] items-center justify-center"
        >
          <div className="absolute size-[20rem] rounded-full border border-primary/20 sm:size-[27rem]" />
          <div className="animate-ring-spin absolute size-[17rem] rounded-full border border-dashed border-secondary/25 sm:size-[23rem]" />
          <div className="glass-strong relative flex size-[19rem] items-center justify-center rounded-[4rem] sm:size-[25rem]">
            <Desha expression="idle" size="xl" />
          </div>
          <div className="glass absolute bottom-5 right-0 max-w-56 rounded-2xl p-4 sm:right-4">
            <div className="flex items-center gap-2 text-sm font-bold">
              <ShieldCheck size={18} className="text-success" /> {t("fairJudge")}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{t("proofRequired")}</p>
          </div>
        </motion.div>
      </section>

      <motion.section
        ref={authRef}
        initial={false}
        animate={{
          opacity: authVisible ? 1 : 0,
          height: authVisible ? "auto" : 0,
          marginTop: authVisible ? 32 : 0,
        }}
        className="mx-auto max-w-xl overflow-hidden"
        aria-hidden={!authVisible}
      >
        <div className="glass-strong rounded-3xl p-6 text-center sm:p-8">
          <span className="gradient-magic mx-auto flex size-12 items-center justify-center rounded-2xl font-display text-2xl font-black">
            د
          </span>
          <h2 className="mt-5 font-display text-2xl font-bold">{t("ready")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("googleHint")}</p>
          <button
            onClick={signIn}
            disabled={loading}
            className="premium-button mt-6 flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-foreground px-6 text-base font-bold text-background disabled:cursor-wait disabled:opacity-60"
          >
            <GoogleIcon />
            {loading ? t("loading") : t("google")}
          </button>
          {error && (
            <p role="alert" className="mt-3 text-sm font-semibold text-destructive">
              {error}
            </p>
          )}
        </div>
      </motion.section>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M21.35 11.1H12v2.9h5.35c-.25 1.4-1.02 2.58-2.17 3.38v2.8h3.5c2.05-1.9 3.23-4.7 3.23-8 0-.37-.02-.72-.06-1.08z"
      />
      <path
        fill="currentColor"
        opacity=".7"
        d="M12 22c2.7 0 4.97-.9 6.63-2.42l-3.5-2.8c-.9.6-2.05.97-3.13.97-2.4 0-4.44-1.62-5.17-3.8H3.2v2.88C4.85 19.98 8.16 22 12 22z"
      />
      <path
        fill="currentColor"
        opacity=".5"
        d="M6.83 13.95A5.97 5.97 0 0 1 6.5 12c0-.68.12-1.33.33-1.95V7.17H3.2A9.97 9.97 0 0 0 2 12c0 1.6.38 3.13 1.2 4.83l3.63-2.88z"
      />
      <path
        fill="currentColor"
        opacity=".8"
        d="M12 6.25c1.47 0 2.78.5 3.82 1.5l2.86-2.87C16.96 3.3 14.7 2.25 12 2.25 8.16 2.25 4.85 4.27 3.2 7.17l3.63 2.88C7.56 7.87 9.6 6.25 12 6.25z"
      />
    </svg>
  );
}
