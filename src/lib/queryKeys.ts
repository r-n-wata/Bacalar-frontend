export const queryKeys = {
  events: {
    list: () => ['events', 'list'] as const,
  },
  restaurants: {
    list: () => ['restaurants', 'list'] as const,
  },
  tours: {
    list: () => ['tours', 'list'] as const,
  },
  booking: {
    checklist: () => ['booking', 'checklist'] as const,
  },
}
