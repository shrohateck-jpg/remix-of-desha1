import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const locales = [
  ["ar-EG", "مصري", "rtl"],
  ["ar", "العربية", "rtl"],
  ["en", "English", "ltr"],
  ["fr", "Français", "ltr"],
  ["es", "Español", "ltr"],
  ["de", "Deutsch", "ltr"],
  ["it", "Italiano", "ltr"],
  ["pt", "Português", "ltr"],
  ["tr", "Türkçe", "ltr"],
  ["ru", "Русский", "ltr"],
  ["ja", "日本語", "ltr"],
  ["ko", "한국어", "ltr"],
  ["zh", "中文", "ltr"],
  ["hi", "हिन्दी", "ltr"],
] as const;

export type Locale = (typeof locales)[number][0];
type Params = Record<string, string | number>;

const en = {
  brand: "Desha",
  language: "Language",
  login: "Sign in",
  heroBadge: "A completely different challenge experience",
  heroTitle: "Challenge yourself",
  heroSubtitle: "Test your knowledge and enjoy the ultimate challenge experience.",
  heroBody:
    "Turn daily goals into real missions, prove your progress, and collect points while Desha watches every step.",
  start: "Start now",
  discover: "Discover the experience",
  challenges: "Challenges",
  smart: "Smart",
  photoProof: "Photo proof",
  daily: "Daily",
  streakXp: "Streak & XP",
  fairJudge: "A tough judge... but fair",
  proofRequired: "Progress only counts with proof.",
  ready: "Ready to start the challenge?",
  googleHint: "Sign in with Google and start your first mission.",
  google: "Continue with Google",
  loading: "Just a moment...",
  signInError: "We couldn't sign you in. Please try again.",
  homeLabel: "Desha, home",
  navMain: "Main navigation",
  navMobile: "Mobile navigation",
  home: "Home",
  challenge: "Challenge",
  history: "History",
  calendar: "Calendar",
  stats: "Statistics",
  profile: "Profile",
  howTo: "How to play?",
  settings: "Settings",
  keepGoing: "Keep going",
  nextLevel: "Every challenge brings you closer to the next level.",
  logout: "Sign out",
  account: "Account",
  googleAccount: "You're signed in with Google.",
  danger: "Danger zone",
  deleteWarning:
    "Deleting your account permanently removes challenges, points, and levels. This cannot be undone.",
  deletePlaceholder: 'Type "DELETE" to confirm',
  deleteToken: "DELETE",
  deleting: "Deleting...",
  deleteAccount: "Delete my account permanently",
  genericError: "Something went wrong.",
  notFound: "This page doesn't exist",
  notFoundBody: "It may have moved or the address may be incorrect.",
  backHome: "Back home",
  loadFailed: "The page couldn't load",
  loadFailedBody: "Something went wrong. Try again or return home.",
  retry: "Try again",
  xp: "XP",
  seconds: "seconds",
  characterAlt: "Desha character",
} as const;
type Key = keyof typeof en;

const arEg: Record<Key, string> = {
  brand: "ديشا",
  language: "اللغة",
  login: "تسجيل الدخول",
  heroBadge: "تجربة تحدي مختلفة تماماً",
  heroTitle: "اتحدى نفسك",
  heroSubtitle: "اختبر معلوماتك واستمتع بأقوى تجربة تحدي.",
  heroBody:
    "حوّل أهدافك اليومية لمهمات حقيقية، اثبت إنجازك، واجمع نقاطك بينما ديشا بيراقب كل خطوة.",
  start: "ابدأ دلوقتي",
  discover: "اكتشف التجربة",
  challenges: "تحدي",
  smart: "ذكي",
  photoProof: "إثبات بالصور",
  daily: "يومي",
  streakXp: "ستريك و XP",
  fairJudge: "الحكم صعب... بس عادل",
  proofRequired: "مش هنحسب الإنجاز من غير دليل.",
  ready: "جاهز تبدأ التحدي؟",
  googleHint: "ادخل بحساب جوجل وابدأ أول مهمة ليك.",
  google: "ادخل بحساب جوجل",
  loading: "ثانية واحدة...",
  signInError: "حصلت مشكلة في تسجيل الدخول... جرب تاني.",
  homeLabel: "ديشا، الرئيسية",
  navMain: "التنقل الرئيسي",
  navMobile: "التنقل الرئيسي للموبايل",
  home: "الرئيسية",
  challenge: "التحدي",
  history: "التاريخ",
  calendar: "التقويم",
  stats: "الإحصائيات",
  profile: "البروفايل",
  howTo: "إزاي ألعب؟",
  settings: "الإعدادات",
  keepGoing: "خليك مستمر",
  nextLevel: "كل تحدي بيقربك من المستوى الجاي.",
  logout: "خروج",
  account: "الحساب",
  googleAccount: "إنت داخل بحساب جوجل.",
  danger: "منطقة الخطر",
  deleteWarning: "مسح الحساب بيمسح كل حاجة — التحديات والنقاط والمستوى. مفيش رجوع.",
  deletePlaceholder: 'اكتب "امسح" للتأكيد',
  deleteToken: "امسح",
  deleting: "بنمسح...",
  deleteAccount: "امسح حسابي نهائياً",
  genericError: "حصلت مشكلة.",
  notFound: "الصفحة دي مش موجودة",
  notFoundBody: "يمكن اتمسحت أو إنت كتبت اللينك غلط.",
  backHome: "ارجع للرئيسية",
  loadFailed: "الصفحة معملتش تحميل",
  loadFailedBody: "حصلت مشكلة عندنا. جرب تاني أو ارجع للرئيسية.",
  retry: "جرب تاني",
  xp: "XP",
  seconds: "ثواني",
  characterAlt: "شخصية ديشا",
};
const ar: Record<Key, string> = {
  ...arEg,
  heroTitle: "تحدَّ نفسك",
  heroBody:
    "حوّل أهدافك اليومية إلى مهام حقيقية، وأثبت إنجازك، واجمع النقاط بينما يتابع ديشا كل خطوة.",
  start: "ابدأ الآن",
  googleHint: "سجّل الدخول باستخدام Google وابدأ مهمتك الأولى.",
  keepGoing: "واصل التقدم",
  howTo: "كيف ألعب؟",
  logout: "تسجيل الخروج",
  deleteToken: "حذف",
  deletePlaceholder: 'اكتب "حذف" للتأكيد',
};

const overrides: Record<Exclude<Locale, "en" | "ar-EG" | "ar">, Partial<Record<Key, string>>> = {
  fr: {
    language: "Langue",
    login: "Connexion",
    heroTitle: "Défiez-vous",
    heroSubtitle: "Testez vos connaissances et vivez une expérience de défi unique.",
    start: "Commencer",
    discover: "Découvrir",
    home: "Accueil",
    challenge: "Défi",
    history: "Historique",
    calendar: "Calendrier",
    stats: "Statistiques",
    profile: "Profil",
    settings: "Paramètres",
    logout: "Déconnexion",
    google: "Continuer avec Google",
    ready: "Prêt à relever le défi ?",
    deleteToken: "SUPPRIMER",
  },
  es: {
    language: "Idioma",
    login: "Iniciar sesión",
    heroTitle: "Ponte a prueba",
    heroSubtitle: "Pon a prueba tus conocimientos y disfruta del desafío definitivo.",
    start: "Empezar",
    discover: "Descubrir",
    home: "Inicio",
    challenge: "Desafío",
    history: "Historial",
    calendar: "Calendario",
    stats: "Estadísticas",
    profile: "Perfil",
    settings: "Ajustes",
    logout: "Cerrar sesión",
    google: "Continuar con Google",
    ready: "¿Listo para el desafío?",
    deleteToken: "ELIMINAR",
  },
  de: {
    language: "Sprache",
    login: "Anmelden",
    heroTitle: "Fordere dich heraus",
    heroSubtitle: "Teste dein Wissen und erlebe die ultimative Herausforderung.",
    start: "Jetzt starten",
    discover: "Entdecken",
    home: "Start",
    challenge: "Challenge",
    history: "Verlauf",
    calendar: "Kalender",
    stats: "Statistiken",
    profile: "Profil",
    settings: "Einstellungen",
    logout: "Abmelden",
    google: "Mit Google fortfahren",
    ready: "Bereit für die Challenge?",
    deleteToken: "LÖSCHEN",
  },
  it: {
    language: "Lingua",
    login: "Accedi",
    heroTitle: "Sfida te stesso",
    heroSubtitle: "Metti alla prova le tue conoscenze e vivi la sfida definitiva.",
    start: "Inizia ora",
    discover: "Scopri",
    home: "Home",
    challenge: "Sfida",
    history: "Cronologia",
    calendar: "Calendario",
    stats: "Statistiche",
    profile: "Profilo",
    settings: "Impostazioni",
    logout: "Esci",
    google: "Continua con Google",
    ready: "Pronto per la sfida?",
    deleteToken: "ELIMINA",
  },
  pt: {
    language: "Idioma",
    login: "Entrar",
    heroTitle: "Desafie-se",
    heroSubtitle: "Teste seus conhecimentos e viva o desafio definitivo.",
    start: "Começar",
    discover: "Descobrir",
    home: "Início",
    challenge: "Desafio",
    history: "Histórico",
    calendar: "Calendário",
    stats: "Estatísticas",
    profile: "Perfil",
    settings: "Configurações",
    logout: "Sair",
    google: "Continuar com Google",
    ready: "Pronto para o desafio?",
    deleteToken: "EXCLUIR",
  },
  tr: {
    language: "Dil",
    login: "Giriş yap",
    heroTitle: "Kendine meydan oku",
    heroSubtitle: "Bilgini test et ve en güçlü meydan okuma deneyimini yaşa.",
    start: "Şimdi başla",
    discover: "Keşfet",
    home: "Ana sayfa",
    challenge: "Meydan okuma",
    history: "Geçmiş",
    calendar: "Takvim",
    stats: "İstatistikler",
    profile: "Profil",
    settings: "Ayarlar",
    logout: "Çıkış",
    google: "Google ile devam et",
    ready: "Meydan okumaya hazır mısın?",
    deleteToken: "SİL",
  },
  ru: {
    language: "Язык",
    login: "Войти",
    heroTitle: "Брось себе вызов",
    heroSubtitle: "Проверьте знания и испытайте себя по-настоящему.",
    start: "Начать",
    discover: "Узнать больше",
    home: "Главная",
    challenge: "Испытание",
    history: "История",
    calendar: "Календарь",
    stats: "Статистика",
    profile: "Профиль",
    settings: "Настройки",
    logout: "Выйти",
    google: "Продолжить с Google",
    ready: "Готовы начать?",
    deleteToken: "УДАЛИТЬ",
  },
  ja: {
    language: "言語",
    login: "ログイン",
    heroTitle: "自分に挑戦しよう",
    heroSubtitle: "知識を試して、究極のチャレンジを楽しもう。",
    start: "今すぐ始める",
    discover: "詳しく見る",
    home: "ホーム",
    challenge: "チャレンジ",
    history: "履歴",
    calendar: "カレンダー",
    stats: "統計",
    profile: "プロフィール",
    settings: "設定",
    logout: "ログアウト",
    google: "Googleで続ける",
    ready: "チャレンジを始めますか？",
    deleteToken: "削除",
  },
  ko: {
    language: "언어",
    login: "로그인",
    heroTitle: "나에게 도전하세요",
    heroSubtitle: "지식을 테스트하고 최고의 도전을 즐겨보세요.",
    start: "지금 시작",
    discover: "자세히 보기",
    home: "홈",
    challenge: "도전",
    history: "기록",
    calendar: "캘린더",
    stats: "통계",
    profile: "프로필",
    settings: "설정",
    logout: "로그아웃",
    google: "Google로 계속",
    ready: "도전할 준비가 됐나요?",
    deleteToken: "삭제",
  },
  zh: {
    language: "语言",
    login: "登录",
    heroTitle: "挑战自己",
    heroSubtitle: "测试你的知识，享受终极挑战体验。",
    start: "立即开始",
    discover: "了解更多",
    home: "首页",
    challenge: "挑战",
    history: "历史",
    calendar: "日历",
    stats: "统计",
    profile: "个人资料",
    settings: "设置",
    logout: "退出登录",
    google: "使用 Google 继续",
    ready: "准备开始挑战了吗？",
    deleteToken: "删除",
  },
  hi: {
    language: "भाषा",
    login: "साइन इन",
    heroTitle: "खुद को चुनौती दें",
    heroSubtitle: "अपने ज्ञान को परखें और बेहतरीन चुनौती का आनंद लें।",
    start: "अभी शुरू करें",
    discover: "और जानें",
    home: "होम",
    challenge: "चुनौती",
    history: "इतिहास",
    calendar: "कैलेंडर",
    stats: "आँकड़े",
    profile: "प्रोफ़ाइल",
    settings: "सेटिंग्स",
    logout: "साइन आउट",
    google: "Google से जारी रखें",
    ready: "चुनौती के लिए तैयार हैं?",
    deleteToken: "हटाएँ",
  },
};

const catalogs: Record<Locale, Record<Key, string>> = {
  "ar-EG": arEg,
  ar,
  en,
  ...Object.fromEntries(Object.entries(overrides).map(([k, v]) => [k, { ...en, ...v }])),
} as Record<Locale, Record<Key, string>>;
const I18nContext = createContext<null | {
  locale: Locale;
  dir: "rtl" | "ltr";
  setLocale: (l: Locale) => void;
  t: (k: Key, p?: Params) => string;
  formatDate: (v: Date | string | number, o?: Intl.DateTimeFormatOptions) => string;
}>(null);
const STORAGE_KEY = "desha-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar-EG");
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && locales.some(([id]) => id === saved)) setLocaleState(saved);
  }, []);
  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);
  const dir = locales.find(([id]) => id === locale)?.[2] ?? "ltr";
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);
  useEffect(() => {
    const sync = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue && locales.some(([id]) => id === e.newValue))
        setLocaleState(e.newValue as Locale);
    };
    addEventListener("storage", sync);
    return () => removeEventListener("storage", sync);
  }, []);
  const t = useCallback(
    (key: Key, params?: Params) => {
      let value = catalogs[locale][key] ?? en[key];
      for (const [k, v] of Object.entries(params ?? {}))
        value = value.replaceAll(`{${k}}`, String(v));
      return value;
    },
    [locale],
  );
  const formatDate = useCallback(
    (value: Date | string | number, options?: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat(locale, options).format(new Date(value)),
    [locale],
  );
  const value = useMemo(
    () => ({ locale, dir, setLocale, t, formatDate }),
    [locale, dir, setLocale, t, formatDate],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used within LanguageProvider");
  return value;
}
