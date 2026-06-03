import type {
  AdminSession,
  AdminSubmissionsResponse,
} from '../types/admin'

export const adminSessionFixture: AdminSession = {
  email: 'admin@bacalar.test',
  userId: 'admin-user-1',
}

export const adminSubmissionsFixture: AdminSubmissionsResponse = {
  items: [
    {
      id: 'event-submission-1',
      type: 'events',
      status: 'PENDING',
      title: 'Lagoon Music Night',
      startsAt: '2026-06-03T18:30:00.000Z',
      location: 'Casa del Muelle',
      category: 'music',
      description: 'A sunset set with local musicians and food pop-ups.',
      contactName: 'Ana Torres',
      contactMethod: 'ana@example.com',
      submittedLocale: 'en',
      createdAt: '2026-06-02T10:00:00.000Z',
      updatedAt: '2026-06-02T10:00:00.000Z',
      images: [
        {
          id: 'event-image-1',
          source: 'EXTERNAL_URL',
          url: 'https://images.example.com/event-1.jpg',
          sortOrder: 0,
        },
      ],
    },
    {
      id: 'restaurant-submission-1',
      type: 'restaurants',
      status: 'PENDING',
      name: 'Casa de Maiz',
      cuisine: 'Mexican',
      moment: 'dinner',
      priceBand: '$$',
      description: 'A lagoon-side dinner stop with wood-fired seafood.',
      contactName: 'Luis Perez',
      contactMethod: 'luis@example.com',
      submittedLocale: 'es',
      createdAt: '2026-06-02T09:00:00.000Z',
      updatedAt: '2026-06-02T09:00:00.000Z',
      images: [
        {
          id: 'restaurant-image-1',
          source: 'EXTERNAL_URL',
          url: 'https://images.example.com/restaurant-1.jpg',
          sortOrder: 0,
        },
      ],
    },
    {
      id: 'tour-submission-1',
      type: 'tours',
      status: 'PENDING',
      name: 'Sunrise Sail',
      category: 'premium',
      durationHours: 4,
      priceFrom: 2200,
      description: 'A small-group sunrise route with breakfast on board.',
      contactName: 'Marta Ruiz',
      contactMethod: 'marta@example.com',
      submittedLocale: 'en',
      createdAt: '2026-06-01T18:00:00.000Z',
      updatedAt: '2026-06-01T18:00:00.000Z',
      images: [
        {
          id: 'tour-image-1',
          source: 'EXTERNAL_URL',
          url: 'https://images.example.com/tour-1.jpg',
          sortOrder: 0,
        },
      ],
    },
  ],
}
