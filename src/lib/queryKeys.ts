export const queryKeys = {
  admin: {
    session: (token: string) => ['admin', 'session', token] as const,
    submissionsRoot: ['admin', 'submissions'] as const,
    submissions: (status: string, type: string) =>
      ['admin', 'submissions', status, type] as const,
    submissionDetail: (type: string, id: string) =>
      ['admin', 'submission-detail', type, id] as const,
    contentRoot: ['admin', 'content'] as const,
    content: (language: string, type: string) =>
      ['admin', 'content', language, type] as const,
  },
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
    list: (language: string, category: string, limit: number) =>
      ['restaurants', 'list', language, category, limit] as const,
    detail: (id: string, language: string) =>
      ['restaurants', 'detail', id, language] as const,
  },
  tours: {
    list: (language: string, category: string, limit: number) =>
      ['tours', 'list', language, category, limit] as const,
    detail: (id: string, language: string) =>
      ['tours', 'detail', id, language] as const,
  },
}
