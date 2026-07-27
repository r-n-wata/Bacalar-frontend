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
    contentDetail: (type: string, id: string) =>
      ['admin', 'content-detail', type, id] as const,
  },
  home: {
    content: (language: string) => ['home', 'content', language] as const,
  },
  events: {
    list: (
      language: string,
      filters: {
        category?: string
        search?: string
      },
      limit: number,
    ) => ['events', 'list', language, filters, limit] as const,
    detail: (id: string, language: string) =>
      ['events', 'detail', id, language] as const,
  },
  restaurants: {
    list: (
      language: string,
      filters: {
        category?: string
        search?: string
        priceBand?: '$' | '$$' | '$$$'
      },
      limit: number,
    ) => ['restaurants', 'list', language, filters, limit] as const,
    detail: (id: string, language: string) =>
      ['restaurants', 'detail', id, language] as const,
  },
  tours: {
    list: (
      language: string,
      filters: {
        category?: string
        search?: string
        priceMin?: number
        priceMax?: number
        durationHours?: number[]
      },
      limit: number,
    ) => ['tours', 'list', language, filters, limit] as const,
    detail: (id: string, language: string) =>
      ['tours', 'detail', id, language] as const,
  },
}
