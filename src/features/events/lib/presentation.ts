import type { Event, EventCategory, EventDetail } from '../types/event'

const categoryMoodKeyMap: Record<EventCategory, string> = {
  music: 'events.moods.music',
  food: 'events.moods.food',
  wellness: 'events.moods.wellness',
}

export function getMoodTranslationKey(category: EventCategory) {
  return categoryMoodKeyMap[category]
}

export function isFeaturedEvent(event: Event, index: number) {
  return index === 0 && Boolean(event.startsAt)
}

export function isUpcomingEvent(event: Event | EventDetail) {
  return Boolean(event.startsAt)
}
