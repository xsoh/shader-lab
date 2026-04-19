const RTL_LANGUAGES = new Set([
  "ar", // Arabic
  "he", // Hebrew
  "fa", // Farsi/Persian
  "ur", // Urdu
  "dv", // Dhivehi
  "ku", // Kurdish
  "ps", // Pashto
  "sd", // Sindhi
  "yi", // Yiddish
])

export type TextDirection = "ltr" | "rtl"

export function getLanguageDirection(lang: string): TextDirection {
  const primary = lang.split("-")[0].toLowerCase()
  return RTL_LANGUAGES.has(primary) ? "rtl" : "ltr"
}

export function parseAcceptLanguage(acceptLanguage: string | null): {
  lang: string
  dir: TextDirection
} {
  if (!acceptLanguage) {
    return { lang: "en", dir: "ltr" }
  }

  // Accept-Language format: "ar-AE,ar;q=0.9,en-US;q=0.8,en;q=0.7"
  const primaryLocale = acceptLanguage.split(",")[0].trim().split(";")[0].trim()

  if (!primaryLocale) {
    return { lang: "en", dir: "ltr" }
  }

  return {
    lang: primaryLocale,
    dir: getLanguageDirection(primaryLocale),
  }
}
