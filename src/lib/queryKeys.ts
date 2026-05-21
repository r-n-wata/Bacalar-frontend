export const queryKeys = {
  home: {
    content: (language: string) => ['home', 'content', language] as const,
  },
  events: {
    list: (language: string) => ['events', 'list', language] as const,
  },
  restaurants: {
    list: (language: string) => ['restaurants', 'list', language] as const,
  },
  tours: {
    list: (language: string) => ['tours', 'list', language] as const,
  },
}
