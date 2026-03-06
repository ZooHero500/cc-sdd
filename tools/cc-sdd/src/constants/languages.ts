export const supportedLanguages = [
  'en',
  'zh',
] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];
