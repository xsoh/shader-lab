const RTL_LANGUAGES = new Set([
  "ar", // Arabic
  "he", // Hebrew
  "fa", // Farsi/Persian
  "ur", // Urdu
  "dv", // Dhivehi
  "ps", // Pashto
  "sd", // Sindhi
  "yi", // Yiddish
])

// Scripts that are always RTL regardless of language
const RTL_SCRIPTS = new Set(["Arab", "Hebr", "Thaa", "Tfng", "Syrc"])

export type TextDirection = "ltr" | "rtl"

export function getLanguageDirection(lang: string): TextDirection {
  const parts = lang.split("-")
  const primary = parts[0].toLowerCase()

  // Check for an explicit script subtag (e.g. "ku-Arab" → RTL, "ku-Latn" → LTR)
  // Script subtags are 4 letters with title case (e.g. "Arab", "Latn")
  const scriptSubtag = parts.find((p) => /^[A-Z][a-z]{3}$/.test(p))
  if (scriptSubtag) {
    return RTL_SCRIPTS.has(scriptSubtag) ? "rtl" : "ltr"
  }

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
