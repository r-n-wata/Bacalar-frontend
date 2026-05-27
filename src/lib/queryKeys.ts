export const queryKeys = {
  home: {
    content: (language: string) => ['home', 'content', language] as const,
  },
  events: {
    list: (language: string, category: string, limit: number) =>
      ['events', 'list', language, category, limit] as const,
    detail: (id: string, language: string) =>
      ['events', 'detail', id, language] as const,
  },
  restaurants: {
    list: (language: string) => ['restaurants', 'list', language] as const,
    detail: (id: string, language: string) =>
      ['restaurants', 'detail', id, language] as const,
  },
  tours: {
    list: (language: string) => ['tours', 'list', language] as const,
    detail: (id: string, language: string) =>
      ['tours', 'detail', id, language] as const,
  },
}
