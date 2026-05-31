import type { EventCategory, EventDetail } from '../types/event'

const categoryMoodKeyMap: Record<EventCategory, string> = {
  music: 'events.moods.music',
  food: 'events.moods.food',
  wellness: 'events.moods.wellness',
}

export function getMoodTranslationKey(category: EventCategory) {
  return categoryMoodKeyMap[category]
}

export function isUpcomingEvent(event: EventDetail) {
  return Boolean(event.startsAt)
}
