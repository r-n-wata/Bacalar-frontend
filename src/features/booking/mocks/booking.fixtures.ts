import type { AppLanguage } from '../../../app/i18n/config'
import type { BookingContent } from '../types/booking-content'

const bookingByLanguage: Record<AppLanguage, BookingContent> = {
  en: {
    eyebrow: 'Booking feature',
    title: 'Booking flow foundation',
    description:
      'This slice demonstrates the split from the architecture document: server-driven checklist data in React Query, user draft input in Zustand.',
    form: {
      travelDateLabel: 'Travel date',
      travelDateHint: 'Choose the date you want to be on the lagoon.',
      travelDatePlaceholder: 'Select your travel date',
      travelDateAriaLabel: 'Select your travel date',
      guestsLabel: 'Guests',
      guestsHint: 'Start with your expected party size and adjust if needed.',
      draftCopy:
        'Draft state stays in Zustand here because it is user-entered UI state, not API-owned data.',
    },
    nextSteps: {
      eyebrow: 'Next workflow steps',
      title: 'Ready for confirmation',
      description:
        'These next steps stay close to the booking flow so API-backed checklist updates and local draft state stay easy to reason about.',
    },
    items: [
      { id: 'availability', label: 'Confirm live availability' },
      { id: 'guest-details', label: 'Collect guest and contact details' },
      { id: 'payment', label: 'Prepare deposit or full-payment handoff' },
    ],
  },
  es: {
    eyebrow: 'Funcionalidad de reservas',
    title: 'Base del flujo de reserva',
    description:
      'Este bloque demuestra la separacion del documento de arquitectura: checklist remota en React Query y entrada del usuario en Zustand.',
    form: {
      travelDateLabel: 'Fecha de viaje',
      travelDateHint: 'Elige la fecha en la que quieres estar en la laguna.',
      travelDatePlaceholder: 'Selecciona tu fecha de viaje',
      travelDateAriaLabel: 'Selecciona tu fecha de viaje',
      guestsLabel: 'Huespedes',
      guestsHint: 'Comienza con el tamano esperado del grupo y ajusta si hace falta.',
      draftCopy:
        'El borrador permanece en Zustand porque es estado de UI ingresado por la persona usuaria, no datos del API.',
    },
    nextSteps: {
      eyebrow: 'Siguientes pasos',
      title: 'Listo para confirmar',
      description:
        'Estos siguientes pasos permanecen cerca del flujo de reserva para que las actualizaciones del checklist y el estado local sean faciles de entender.',
    },
    items: [
      { id: 'availability', label: 'Confirmar disponibilidad en vivo' },
      { id: 'guest-details', label: 'Recopilar datos de huespedes y contacto' },
      { id: 'payment', label: 'Preparar anticipo o pago completo' },
    ],
  },
}

export function getBookingFixture(language: AppLanguage) {
  return bookingByLanguage[language]
}
