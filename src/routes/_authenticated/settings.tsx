import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Languages, LogOut, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { deleteAccount } from "@/lib/game.functions";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/settings")({ component: SettingsPage });

function SettingsPage() {
  const router = useRouter();
  const deleteFn = useServerFn(deleteAccount);
  const { t } = useI18n();
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const signOut = async () => {
    await supabase.auth.signOut();
    router.navigate({ to: "/" });
  };
  const del = useMutation({
    mutationFn: () => deleteFn({}),
    onSuccess: async () => {
      await supabase.auth.signOut();
      router.navigate({ to: "/" });
    },
    onError: () => setError(t("genericError")),
  });
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-3xl font-bold text-glow">{t("settings")}</h1>
      <div className="glass rounded-3xl p-5">
        <div className="flex items-center gap-2">
          <Languages size={18} />
          <h2 className="font-bold">{t("language")}</h2>
        </div>
        <div className="mt-4 max-w-xs">
          <LanguageSwitcher />
        </div>
      </div>
      <div className="glass rounded-3xl p-5">
        <h2 className="font-bold">{t("account")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t("googleAccount")}</p>
        <button
          onClick={signOut}
          className="mt-4 flex items-center gap-2 rounded-xl bg-muted/50 px-4 py-2.5 text-sm font-bold transition-colors hover:bg-muted"
        >
          <LogOut size={16} /> {t("logout")}
        </button>
      </div>
      <div className="glass rounded-3xl border-destructive/30 p-5">
        <h2 className="font-bold text-destructive">{t("danger")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t("deleteWarning")}</p>
        <input
          value={confirmText}
          onChange={(event) => setConfirmText(event.target.value)}
          placeholder={t("deletePlaceholder")}
          className="mt-4 w-full rounded-xl border border-input bg-muted/40 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-destructive"
        />
        <button
          onClick={() => del.mutate()}
          disabled={confirmText.trim() !== t("deleteToken") || del.isPending}
          className="mt-3 flex items-center gap-2 rounded-xl bg-destructive/15 px-4 py-2.5 text-sm font-bold text-destructive transition-opacity disabled:opacity-40"
        >
          <Trash2 size={16} /> {del.isPending ? t("deleting") : t("deleteAccount")}
        </button>
        {error && (
          <p role="alert" className="mt-3 text-sm font-bold text-destructive">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
