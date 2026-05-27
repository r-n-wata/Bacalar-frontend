import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const resources = {
  en: {
    translation: {
      shell: {
        brandKicker: 'Bacalar',
        brandTitle: 'Plan your lagoon stay with confidence',
        summary:
          'Discover stays, food, tours, and timely local picks built around the colors and calm of Bacalar.',
        startExploring: 'Start exploring',
        menu: 'Menu',
        footer: {
          brandTitle: 'Bacalar',
          brandCopy:
            'Curated lagoon experiences, food, and timely local plans for a calmer Bacalar trip.',
          navTitle: 'Explore',
          supportTitle: 'Plan with confidence',
          location: 'Bacalar, Quintana Roo',
          contact: 'Planning support available daily',
          legal: 'Curated Bacalar guide for browsing and trip planning.',
        },
        languageLabel: 'Language',
        nav: {
          overview: 'Overview',
          events: 'Events',
          restaurants: 'Restaurants',
          tours: 'Tours',
        },
      },
      common: {
        loading: 'Loading...',
        error: 'Something went wrong. Please try again.',
      },
      home: {
        loading: 'Loading homepage...',
        error: 'We could not load the homepage right now. Please try again.',
        spotlightEyebrow: 'Browse quickly',
        spotlightTitle: 'Pick the next right move',
        spotlightDescription:
          'A compact way to shift between lagoon plans, food, and timely local updates.',
        toursCta: 'See all tours',
        restaurantsCta: 'See all restaurants',
        eventsCta: 'See all events',
      },
      events: {
        loading: 'Loading events...',
        error:
          'We could not load events right now. Please refresh or try another language.',
        submitCta: {
          eyebrow: 'Host something in Bacalar?',
          title: 'Submit an event for review',
          description:
            'Share the key details and we will review it before anything goes live.',
          action: 'Submit an event',
        },
        submit: {
          eyebrow: 'Public submission',
          title: 'Submit an event',
          description:
            'Send us the basics, contact details, and optional images. Every submission stays private and pending until reviewed.',
          action: 'Send submission',
          submitting: 'Sending submission...',
          optional: 'Optional',
          error:
            'We could not submit your event right now. Please review the details and try again.',
          successEyebrow: 'Submission received',
          successTitle: 'Thanks, we have your event',
          successDescription:
            'Your submission is pending review and has not been published.',
          successNote:
            'Our team will review the details, media, and timing before deciding whether to promote it into the curated events feed.',
          submitAnother: 'Submit another event',
          fields: {
            title: 'Event title',
            startsAt: 'Date and time',
            location: 'Location',
            category: 'Category',
            description: 'Description',
            contactName: 'Contact name',
            contactMethod: 'Primary contact method',
            instagram: 'Instagram',
            whatsapp: 'WhatsApp',
          },
          placeholders: {
            contactMethod: 'Email, phone number, or Instagram handle',
          },
          media: {
            title: 'Media',
            description:
              'Add up to 6 images total across uploads and external image links.',
            count: '{{count}} of {{max}} images attached',
            uploadLabel: 'Upload images',
            uploadHint: 'JPG, PNG, or WEBP. Up to 5 MB each.',
            externalUrlLabel: 'External image URLs',
            externalUrlHint: 'We will verify the link before accepting it.',
            addUrl: 'Add URL',
            selectedUploads: 'Selected uploads',
            selectedLinks: 'Selected image links',
            remove: 'Remove',
            none: 'Nothing added yet.',
          },
          validation: {
            required: 'This field is required.',
            maxImages: 'You can attach up to {{count}} images.',
            fileType: 'Use JPG, PNG, or WEBP images only.',
            fileSize: 'Each image must stay under {{maxSize}}.',
            urlRequired: 'Enter an image URL before adding it.',
            urlFormat: 'Enter a valid http or https image URL.',
            urlImageType: 'Use a JPG, PNG, or WEBP image URL.',
          },
        },
        categoryNavLabel: 'Event categories',
        detailEyebrow: 'Featured event',
        thisWeekNote:
          'This week in Bacalar: timely picks first, with room to browse more when you need it.',
        loadMore: 'Load more events',
        loadingMore: 'Loading more events...',
        emptyTitle: 'No events in this category right now.',
        emptyDescription:
          'Try another category or come back later for more {{category}} plans.',
        backToList: 'See all events',
        backHome: 'Back to homepage',
        categories: {
          all: 'All',
          music: 'Music',
          food: 'Food',
          wellness: 'Wellness',
        },
        badges: {
          featured: 'Featured',
          upcoming: 'Upcoming',
          thisWeek: 'This week',
        },
        moods: {
          music: 'Sunset music',
          food: 'Town food',
          wellness: 'Quiet wellness',
        },
        detailNote: {
          upcoming: 'One of the next timely moments to layer into the week.',
          thisWeek: 'A current Bacalar pick that works best as a lighter add-on to the trip.',
        },
        meta: {
          when: 'When',
          where: 'Where',
          type: 'Type',
          mood: 'Mood',
        },
      },
      restaurants: {
        loading: 'Loading restaurants...',
        detailEyebrow: 'Featured restaurant',
        backToList: 'See all restaurants',
        backHome: 'Back to homepage',
        meta: {
          cuisine: 'Cuisine',
          vibe: 'Vibe',
          price: 'Price',
        },
      },
      tours: {
        loading: 'Loading tours...',
        detailEyebrow: 'Featured tour',
        backToList: 'See all tours',
        backHome: 'Back to homepage',
        hours_one: '{{count}} hour on the water',
        hours_other: '{{count}} hours on the water',
        meta: {
          category: 'Category',
          duration: 'Duration',
          price: 'Starting from',
        },
      },
    },
  },
  es: {
    translation: {
      shell: {
        brandKicker: 'Bacalar',
        brandTitle: 'Planea tu estancia en la laguna con confianza',
        summary:
          'Descubre hospedajes, comida, tours y planes locales pensados alrededor del color y la calma de Bacalar.',
        startExploring: 'Comenzar a explorar',
        menu: 'Menu',
        footer: {
          brandTitle: 'Bacalar',
          brandCopy:
            'Experiencias curadas de laguna, comida y planes locales para un viaje a Bacalar mas claro.',
          navTitle: 'Explorar',
          supportTitle: 'Planea con confianza',
          location: 'Bacalar, Quintana Roo',
          contact: 'Apoyo de planeacion disponible todos los dias',
          legal: 'Guia curada de Bacalar para explorar y planear el viaje.',
        },
        languageLabel: 'Idioma',
        nav: {
          overview: 'Inicio',
          events: 'Eventos',
          restaurants: 'Restaurantes',
          tours: 'Tours',
        },
      },
      common: {
        loading: 'Cargando...',
        error: 'Algo salio mal. Intentalo de nuevo.',
      },
      home: {
        loading: 'Cargando inicio...',
        error:
          'No pudimos cargar la pagina principal en este momento. Intentalo de nuevo.',
        spotlightEyebrow: 'Explora rapido',
        spotlightTitle: 'Elige el siguiente mejor paso',
        spotlightDescription:
          'Una forma compacta de cambiar entre laguna, comida y planes locales del momento.',
        toursCta: 'Ver todos los tours',
        restaurantsCta: 'Ver todos los restaurantes',
        eventsCta: 'Ver todos los eventos',
      },
      events: {
        loading: 'Cargando eventos...',
        error:
          'No pudimos cargar los eventos en este momento. Actualiza o prueba otro idioma.',
        submitCta: {
          eyebrow: 'Organizas algo en Bacalar?',
          title: 'Envia un evento para revision',
          description:
            'Comparte los datos clave y lo revisaremos antes de que aparezca publicado.',
          action: 'Enviar un evento',
        },
        submit: {
          eyebrow: 'Envio publico',
          title: 'Enviar un evento',
          description:
            'Mandanos los datos base, contacto e imagenes opcionales. Todo queda privado y pendiente hasta revision.',
          action: 'Enviar solicitud',
          submitting: 'Enviando solicitud...',
          optional: 'Opcional',
          error:
            'No pudimos enviar tu evento en este momento. Revisa los datos e intentalo de nuevo.',
          successEyebrow: 'Solicitud recibida',
          successTitle: 'Gracias, ya recibimos tu evento',
          successDescription:
            'Tu envio quedo pendiente de revision y aun no esta publicado.',
          successNote:
            'Nuestro equipo revisara los datos, medios y horario antes de decidir si lo promueve al feed curado de eventos.',
          submitAnother: 'Enviar otro evento',
          fields: {
            title: 'Titulo del evento',
            startsAt: 'Fecha y hora',
            location: 'Ubicacion',
            category: 'Categoria',
            description: 'Descripcion',
            contactName: 'Nombre de contacto',
            contactMethod: 'Metodo principal de contacto',
            instagram: 'Instagram',
            whatsapp: 'WhatsApp',
          },
          placeholders: {
            contactMethod: 'Correo, telefono o usuario de Instagram',
          },
          media: {
            title: 'Medios',
            description:
              'Agrega hasta 6 imagenes en total entre archivos subidos y links externos.',
            count: '{{count}} de {{max}} imagenes adjuntas',
            uploadLabel: 'Subir imagenes',
            uploadHint: 'JPG, PNG o WEBP. Maximo 5 MB cada una.',
            externalUrlLabel: 'URLs externas de imagen',
            externalUrlHint: 'Verificaremos el enlace antes de aceptarlo.',
            addUrl: 'Agregar URL',
            selectedUploads: 'Archivos seleccionados',
            selectedLinks: 'Links de imagen seleccionados',
            remove: 'Quitar',
            none: 'Aun no hay nada agregado.',
          },
          validation: {
            required: 'Este campo es obligatorio.',
            maxImages: 'Puedes adjuntar hasta {{count}} imagenes.',
            fileType: 'Usa solo imagenes JPG, PNG o WEBP.',
            fileSize: 'Cada imagen debe medir menos de {{maxSize}}.',
            urlRequired: 'Ingresa una URL de imagen antes de agregarla.',
            urlFormat: 'Ingresa una URL valida de imagen con http o https.',
            urlImageType: 'Usa una URL de imagen JPG, PNG o WEBP.',
          },
        },
        categoryNavLabel: 'Categorias de eventos',
        detailEyebrow: 'Evento destacado',
        thisWeekNote:
          'Esta semana en Bacalar: primero los planes oportunos, con espacio para seguir explorando si hace falta.',
        loadMore: 'Cargar mas eventos',
        loadingMore: 'Cargando mas eventos...',
        emptyTitle: 'No hay eventos en esta categoria por ahora.',
        emptyDescription:
          'Prueba otra categoria o vuelve mas tarde para ver mas planes de {{category}}.',
        backToList: 'Ver todos los eventos',
        backHome: 'Volver a inicio',
        categories: {
          all: 'Todos',
          music: 'Musica',
          food: 'Comida',
          wellness: 'Bienestar',
        },
        badges: {
          featured: 'Destacado',
          upcoming: 'Proximo',
          thisWeek: 'Esta semana',
        },
        moods: {
          music: 'Musica al atardecer',
          food: 'Sabores del centro',
          wellness: 'Bienestar tranquilo',
        },
        detailNote: {
          upcoming: 'Uno de los siguientes momentos oportunos para sumar a la semana.',
          thisWeek: 'Un plan actual de Bacalar que funciona mejor como extra ligero del viaje.',
        },
        meta: {
          when: 'Cuando',
          where: 'Donde',
          type: 'Tipo',
          mood: 'Ambiente',
        },
      },
      restaurants: {
        loading: 'Cargando restaurantes...',
        detailEyebrow: 'Restaurante destacado',
        backToList: 'Ver todos los restaurantes',
        backHome: 'Volver a inicio',
        meta: {
          cuisine: 'Cocina',
          vibe: 'Ambiente',
          price: 'Precio',
        },
      },
      tours: {
        loading: 'Cargando tours...',
        detailEyebrow: 'Tour destacado',
        backToList: 'Ver todos los tours',
        backHome: 'Volver a inicio',
        hours_one: '{{count}} hora en el agua',
        hours_other: '{{count}} horas en el agua',
        meta: {
          category: 'Categoria',
          duration: 'Duracion',
          price: 'Desde',
        },
      },
    },
  },
} as const

export type AppLanguage = keyof typeof resources

export const defaultLanguage: AppLanguage = 'en'

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
  })
}

export default i18n
