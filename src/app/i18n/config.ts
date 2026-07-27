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
            'Helping you discover the best of Bacalar without the endless searching',
          navTitle: 'Explore',
          supportTitle: 'Plan with confidence',
          location: 'Bacalar, Quintana Roo',
          contact: 'Updated every week with new places and events',
          legal: 'Independent travel guide for Bacalar',
        },
        languageLabel: 'Language',
        nav: {
          overview: 'Overview',
          events: 'Events',
          restaurants: 'Restaurants',
          tours: 'Tours',
          submissions: 'Submissions',
          content: 'Content',
          admin: 'Admin',
          logout: 'Log out',
        },
      },
      common: {
        loading: 'Loading...',
        error: 'Something went wrong. Please try again.',
        retry: 'Try again',
        actions: {
          viewOnMap: 'View on map',
        },
        gallery: {
          viewAllPhotos: 'View all photos',
          close: 'Close gallery',
          previous: 'Previous image',
          next: 'Next image',
          count: '{{current}} / {{total}}',
        },
        contact: {
          eyebrow: 'Connect with business',
          title: 'Contact',
          provider: 'Contact {{providerName}} directly.',
          prompt: 'Contact the operator directly for pricing, availability and questions',
          stickyLabel: 'Quick contact actions',
          methods: {
            whatsapp: 'WhatsApp',
            phone: 'Phone',
            website: 'Website',
            instagram: 'Instagram',
            facebook: 'Facebook',
            maps: 'Google Maps',
            email: 'Email',
          },
        },
        labels: {
          address: 'Address',
          mapUrl: 'Map URL',
          mapEmbedUrl: 'Google Maps embed URL',
          location: 'Location',
        },
      },
      status: {
        actions: {
          home: 'Back to homepage',
        },
        notFound: {
          eyebrow: 'Page not found',
          title: 'This page is not available.',
          description:
            'The link may be outdated or the page may have moved. You can head back to the homepage and keep exploring from there.',
        },
        error: {
          eyebrow: 'Unexpected error',
          title: 'We hit a problem loading this page.',
          description:
            'Please go back home and try again in a moment.',
        },
      },
      admin: {
        auth: {
          checking: 'Checking admin access...',
        },
        status: {
          pending: 'Pending',
          approved: 'Approved',
          rejected: 'Rejected',
        },
        login: {
          eyebrow: 'Admin access',
          title: 'Sign in to review submissions',
          description:
            'Use your admin credentials to review pending events, restaurants, and tours before they go live.',
          action: 'Sign in',
          submitting: 'Signing in...',
          error: 'We could not sign you in as an admin. Please try again.',
          fields: {
            email: 'Email',
            password: 'Password',
          },
        },
        dashboard: {
          eyebrow: 'Admin dashboard',
          title: 'Submission review',
          description:
            'Work through new submissions, check past decisions, and keep publication status up to date.',
          loading: 'Loading submissions...',
          error:
            'We could not load the submissions right now. Please try again.',
          empty: 'There are no submissions in this filter right now.',
          openSubmission: 'Open submission {{title}}',
          labels: {
            status: 'Status',
            type: 'Content type',
          },
          statusFilters: {
            all: 'All',
            pending: 'Pending',
            approved: 'Approved',
            rejected: 'Rejected',
          },
          typeFilters: {
            all: 'All types',
            events: 'Events',
            restaurants: 'Restaurants',
            tours: 'Tours',
          },
          summary: {
            status: 'Status: {{status}}',
            type: 'Type: {{type}}',
          },
          links: {
            content: 'Manage featured content',
          },
          actions: {
            approve: 'Approve',
            reject: 'Reject',
            logout: 'Log out',
          },
          meta: {
            status: 'Status',
            submitted: 'Submitted',
            locale: 'Locale',
            contact: 'Contact',
            contactName: 'Contact name',
            category: 'Category',
            startsAt: 'Starts',
            location: 'Location',
            address: 'Address',
            mapUrl: 'Map URL',
            mapEmbedUrl: 'Map embed URL',
            cuisine: 'Cuisine',
            moment: 'Moment',
            priceBand: 'Price band',
            duration: 'Duration',
            priceFrom: 'Price from',
          },
        },
        detail: {
          eyebrow: 'Submission detail',
          title: 'Submission detail',
          description:
            'Review the full submission, browse its images, and make a publication decision.',
          loading: 'Loading submission details...',
          error: 'We could not load this submission right now. Please try again.',
          invalidType: 'This submission type is not supported.',
          backToDashboard: 'Back to dashboard',
          descriptionLabel: 'Description',
          galleryTitle: 'Images',
          additionalContacts: 'Additional contact details',
        },
        content: {
          eyebrow: 'Published content',
          title: 'Manage featured content',
          description:
            'Choose which live events, restaurants, and tours should appear in featured rows across the site.',
          loading: 'Loading published content...',
          error:
            'We could not load published content right now. Please try again.',
          empty: 'There is no published content in this section right now.',
          featured: 'Featured',
          notFeatured: 'Not featured',
          summary: {
            count: '{{count}} of {{cap}} featured slots used',
          },
          links: {
            submissions: 'Back to submission review',
          },
          actions: {
            add: 'Add to featured',
            remove: 'Remove from featured',
            edit: 'Edit',
            delete: 'Delete',
            open: 'Open live page',
            dismiss: 'Dismiss',
          },
          featureUpdated: 'Featured content updated.',
          delete: {
            title: 'Archive published listing',
            description:
              'Archive "{{title}}"? It will be removed from the published admin list and public pages.',
            confirm: 'Archive listing',
            cancel: 'Cancel',
            deleting: 'Archiving...',
            success: 'Published listing archived.',
            error:
              'We could not archive this listing right now. Please try again.',
          },
          edit: {
            eyebrow: 'Published listing',
            title: 'Edit published listing',
            description:
              'Update live listing details, translations, and media without affecting the pending submission workflow.',
            loading: 'Loading published listing...',
            error:
              'We could not load this published listing right now. Please try again.',
            invalidType: 'This published content type is not supported.',
            back: 'Back to published content',
            save: 'Save changes',
            saving: 'Saving changes...',
            cancel: 'Cancel',
            success: 'Published listing updated.',
            validationSummary:
              'Please complete the required fields before saving. {{count}} field(s) still need attention.',
            mediaTitle: 'Listing media',
            mediaSummary: '{{count}} of {{cap}} images attached',
            languages: {
              english: 'English',
              spanish: 'Spanish',
            },
            actions: {
              upload: 'Upload images',
              addUrl: 'Add image URL',
              addMedia: 'Add URL',
              removeMedia: 'Remove',
            },
            fields: {
              title: 'Title',
              name: 'Name',
              dateLabel: 'Date label',
              venue: 'Venue',
              organizerName: 'Organizer name',
              description: 'Description',
              vibe: 'Vibe',
              privateOrShared: 'Private or shared',
              bestFor: 'Best for',
              difficulty: 'Difficulty',
              suitableForKids: 'Suitable for kids',
              meetingPoint: 'Meeting point',
              providerName: 'Provider name',
              whatsapp: 'WhatsApp',
              phone: 'Phone',
              website: 'Website',
              instagram: 'Instagram',
              facebook: 'Facebook',
              email: 'Email',
              operatorName: 'Operator name',
              operatorWhatsapp: 'Operator WhatsApp',
              operatorInstagram: 'Operator Instagram',
              operatorWebsite: 'Operator website',
              operatorPrimaryContactMethod: 'Operator primary contact method',
              included: 'Included',
              whatToBring: 'What to bring',
              operatorDescription: 'Operator description',
            },
          },
        },
      },
      home: {
        loading: 'Loading homepage...',
        error: 'We could not load the homepage right now. Please try again.',
        eventsEmptyDescription:
          'There are currently no upcoming events to feature here, but you can still send one in for review.',
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
        errorEyebrow: 'Events update',
        errorTitle: 'We could not load upcoming events.',
        error:
          'We could not load events right now. Please try again.',
        emptyEyebrow: 'Events in Bacalar',
        emptyUpcomingTitle: 'There are currently no upcoming events.',
        emptyUpcomingDescription:
          'Check back soon for new listings, or submit an event for review.',
        detailUnavailableEyebrow: 'Event unavailable',
        detailUnavailableTitle: 'This event is no longer available.',
        detailUnavailableDescription:
          'The event link may be outdated or the listing is no longer live.',
        submitCta: {
          eyebrow: 'Host something in Bacalar?',
          title: 'Submit an event for review',
          description:
            "Share your event details, and we'll review it before publishing.",
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
            address: 'Address',
            mapUrl: 'Map URL',
            mapEmbedUrl: 'Google Maps embed URL',
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
        listAriaLabel: 'Events list',
        featured: {
          ariaLabel: 'Featured events',
          eyebrow: 'Featured now',
          title: 'Our top picks for this week.',
          description:
            'A curated row of timely moments worth considering before you filter deeper.',
        },
        detailEyebrow: 'Featured event',
        detailMetaAriaLabel: 'Event details',
        galleryAriaLabel: 'Event image gallery',
        thisWeekNote:
          'Browse all events by category',
        loadMore: 'Load more events',
        loadingMore: 'Loading more events...',
        backToList: 'Back to Events',
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
        sections: {
          about: 'About this event',
        },
        sidebar: {
          title: 'Plan this event',
        },
      },
      restaurants: {
        loading: 'Loading restaurants...',
        error:
          'We could not load restaurants right now. Please refresh or try another language.',
        submitCta: {
          eyebrow: 'Know a strong Bacalar table?',
          title: 'Know a restaurant we should feature?',
          description:
            "Share the details and we'll review it before adding it to the guide",
          action: 'Submit a restaurant',
        },
        submit: {
          eyebrow: 'Public submission',
          title: 'Submit a restaurant',
          description:
            'Send us the core listing details, contact info, and optional images. Every submission stays private and pending until reviewed.',
          action: 'Send submission',
          submitting: 'Sending submission...',
          optional: 'Optional',
          error:
            'We could not submit your restaurant right now. Please review the details and try again.',
          successEyebrow: 'Submission received',
          successTitle: 'Thanks, we have your restaurant',
          successDescription:
            'Your submission is pending review and has not been published.',
          successNote:
            'Our team will review the listing details, images, and fit before deciding whether to promote it into the curated restaurant guide.',
          submitAnother: 'Submit another restaurant',
          fields: {
            name: 'Restaurant name',
            cuisine: 'Cuisine',
            moment: 'Dining moment',
            priceBand: 'Price band',
            address: 'Address',
            mapUrl: 'Map URL',
            mapEmbedUrl: 'Google Maps embed URL',
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
        categoryNavLabel: 'Restaurant categories',
        listAriaLabel: 'Restaurants list',
        listNote:
          'Browse restaurants by meal',
        featured: {
          ariaLabel: 'Featured restaurants',
          eyebrow: 'Featured now',
          title: 'Start with the strongest meal picks',
          description:
            'A quick row of reliable dining moments before you narrow the list.',
        },
        loadMore: 'Load more restaurants',
        loadingMore: 'Loading more restaurants...',
        emptyTitle: 'No restaurants match this moment right now.',
        emptyDescription:
          'Try another category or come back later for more {{category}} options.',
        detailEyebrow: 'Featured restaurant',
        detailMetaAriaLabel: 'Restaurant details',
        galleryAriaLabel: 'Restaurant image gallery',
        backToList: 'Back to Restaurants',
        backHome: 'Back to homepage',
        categories: {
          all: 'All',
          breakfast: 'Breakfast',
          lunch: 'Lunch',
          dinner: 'Dinner',
        },
        meta: {
          cuisine: 'Cuisine',
          vibe: 'Vibe',
          price: 'Price',
          moment: 'Best for',
        },
        sections: {
          about: 'About this restaurant',
        },
        sidebar: {
          title: 'At a glance',
        },
      },
      tours: {
        loading: 'Loading tours...',
        error:
          'We could not load tours right now. Please refresh or try another language.',
        submitCta: {
          eyebrow: 'Know a great Bacalar tour?',
          title: 'Know a tour we should feature?',
          description:
            "Share the tour details, and we'll review them before adding them to the guide.",
          action: 'Submit a tour',
        },
        submit: {
          eyebrow: 'Public submission',
          title: 'Submit a tour',
          description:
            'Send us the core listing details, contact info, and optional images. Every submission stays private and pending until reviewed.',
          action: 'Send submission',
          submitting: 'Sending submission...',
          optional: 'Optional',
          error:
            'We could not submit your tour right now. Please review the details and try again.',
          successEyebrow: 'Submission received',
          successTitle: 'Thanks, we have your tour',
          successDescription:
            'Your submission is pending review and has not been published.',
          successNote:
            'Our team will review the listing details, media, and fit before deciding whether to promote it into the curated tours guide.',
          submitAnother: 'Submit another tour',
          fields: {
            name: 'Tour name',
            category: 'Category',
            durationHours: 'Duration in hours',
            priceFrom: 'Starting price',
            address: 'Address',
            mapUrl: 'Map URL',
            mapEmbedUrl: 'Google Maps embed URL',
            description: 'Description',
            included: 'What is included',
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
        categoryNavLabel: 'Tour categories',
        listAriaLabel: 'Tours list',
        listNote:
          'Browse tours first, then compare operators at a glance.',
        featured: {
          ariaLabel: 'Featured tours',
          eyebrow: 'Featured now',
          title: 'Our top recommendations',
          description:
            'Our favourite tours to help you get started.',
        },
        detailEyebrow: 'Featured tour',
        detailMetaAriaLabel: 'Tour details',
        galleryAriaLabel: 'Tour image gallery',
        loadMore: 'Load more tours',
        loadingMore: 'Loading more tours...',
        emptyTitle: 'No tours match this category right now.',
        emptyDescription:
          'Try another category or come back later for more {{category}} options.',
        backToList: 'Back to Tours',
        backHome: 'Back to homepage',
        providedBy: 'Provided by {{operator}}',
        providerEyebrow: 'Provided by',
        actions: {
          contactOperator: 'Contact operator',
          checkAvailability: 'Check availability',
          messageOnInstagram: 'Message on Instagram',
        },
        sidebar: {
          title: 'Tour planning',
          operator: 'Operator',
        },
        bestForLabel: 'Best for: {{value}}',
        categories: {
          all: 'All',
          premium: 'Premium',
          group: 'Group',
          adventure: 'Adventure',
        },
        hours_one: '{{count}} hour on the water',
        hours_other: '{{count}} hours on the water',
        priceFrom: 'From {{price}}',
        meta: {
          category: 'Category',
          duration: 'Duration',
          price: 'Starting from',
          privateOrShared: 'Private or shared',
          bestFor: 'Best for',
          difficulty: 'Difficulty',
          suitableForKids: 'Suitable for kids',
        },
        sections: {
          about: 'About this tour',
          included: 'What is included',
          includedFallback:
            'The tour operator hasn’t provided this information yet. Contact them to confirm what is included in your tour price',
          whatToBring: 'What to bring',
          meetingPoint: 'Meeting point',
          operator: 'Tour operator',
        },
        operator: {
          name: 'Operator',
          whatsapp: 'WhatsApp',
          instagram: 'Instagram',
          website: 'Website',
          primaryContactMethod: 'Primary contact method',
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
            'Te ayudamos a descubrir lo mejor de Bacalar sin la busqueda interminable',
          navTitle: 'Explorar',
          supportTitle: 'Planea con confianza',
          location: 'Bacalar, Quintana Roo',
          contact: 'Actualizado cada semana con nuevos lugares y eventos',
          legal: 'Guia de viajes independiente de Bacalar',
        },
        languageLabel: 'Idioma',
        nav: {
          overview: 'Inicio',
          events: 'Eventos',
          restaurants: 'Restaurantes',
          tours: 'Tours',
          submissions: 'Envios',
          content: 'Contenido',
          admin: 'Admin',
          logout: 'Cerrar sesion',
        },
      },
      common: {
        loading: 'Cargando...',
        error: 'Algo salio mal. Intentalo de nuevo.',
        retry: 'Intentar de nuevo',
        actions: {
          viewOnMap: 'Ver en el mapa',
        },
        gallery: {
          viewAllPhotos: 'Ver todas las fotos',
          close: 'Cerrar galeria',
          previous: 'Imagen anterior',
          next: 'Siguiente imagen',
          count: '{{current}} / {{total}}',
        },
        contact: {
          eyebrow: 'Conecta con el negocio',
          title: 'Contacto',
          provider: 'Contacta directamente a {{providerName}}.',
          prompt: 'Contacta directamente al operador para precios, disponibilidad y preguntas',
          stickyLabel: 'Acciones rapidas de contacto',
          methods: {
            whatsapp: 'WhatsApp',
            phone: 'Telefono',
            website: 'Sitio web',
            instagram: 'Instagram',
            facebook: 'Facebook',
            maps: 'Google Maps',
            email: 'Correo',
          },
        },
        labels: {
          address: 'Direccion',
          mapUrl: 'URL del mapa',
          mapEmbedUrl: 'URL embebida de Google Maps',
          location: 'Ubicacion',
        },
      },
      status: {
        actions: {
          home: 'Volver a inicio',
        },
        notFound: {
          eyebrow: 'Pagina no encontrada',
          title: 'Esta pagina no esta disponible.',
          description:
            'Es posible que el enlace ya no exista o que la pagina haya cambiado. Puedes volver al inicio y seguir explorando desde ahi.',
        },
        error: {
          eyebrow: 'Error inesperado',
          title: 'Tuvimos un problema al cargar esta pagina.',
          description:
            'Vuelve al inicio e intentalo de nuevo en un momento.',
        },
      },
      admin: {
        auth: {
          checking: 'Verificando acceso de admin...',
        },
        status: {
          pending: 'Pendiente',
          approved: 'Aprobado',
          rejected: 'Rechazado',
        },
        login: {
          eyebrow: 'Acceso admin',
          title: 'Entra para revisar envios',
          description:
            'Usa tus credenciales de admin para revisar eventos, restaurantes y tours pendientes antes de publicarlos.',
          action: 'Entrar',
          submitting: 'Entrando...',
          error: 'No pudimos iniciarte sesion como admin. Intentalo de nuevo.',
          fields: {
            email: 'Correo',
            password: 'Contrasena',
          },
        },
        dashboard: {
          eyebrow: 'Panel admin',
          title: 'Revision de envios',
          description:
            'Trabaja los nuevos envios, revisa decisiones previas y manten actualizado el estado de publicacion.',
          loading: 'Cargando envios...',
          error:
            'No pudimos cargar los envios en este momento. Intentalo de nuevo.',
          empty: 'No hay envios en este filtro por ahora.',
          openSubmission: 'Abrir envio {{title}}',
          labels: {
            status: 'Estado',
            type: 'Tipo de contenido',
          },
          statusFilters: {
            all: 'Todos',
            pending: 'Pendientes',
            approved: 'Aprobados',
            rejected: 'Rechazados',
          },
          typeFilters: {
            all: 'Todos los tipos',
            events: 'Eventos',
            restaurants: 'Restaurantes',
            tours: 'Tours',
          },
          summary: {
            status: 'Estado: {{status}}',
            type: 'Tipo: {{type}}',
          },
          links: {
            content: 'Gestionar destacados',
          },
          actions: {
            approve: 'Aprobar',
            reject: 'Rechazar',
            logout: 'Cerrar sesion',
          },
          meta: {
            status: 'Estado',
            submitted: 'Enviado',
            locale: 'Idioma',
            contact: 'Contacto',
            contactName: 'Nombre de contacto',
            category: 'Categoria',
            startsAt: 'Empieza',
            location: 'Ubicacion',
            address: 'Direccion',
            mapUrl: 'URL del mapa',
            mapEmbedUrl: 'URL embebida del mapa',
            cuisine: 'Cocina',
            moment: 'Momento',
            priceBand: 'Rango de precio',
            duration: 'Duracion',
            priceFrom: 'Desde',
          },
        },
        detail: {
          eyebrow: 'Detalle del envio',
          title: 'Detalle del envio',
          description:
            'Revisa toda la informacion del envio, navega sus imagenes y toma una decision de publicacion.',
          loading: 'Cargando detalle del envio...',
          error: 'No pudimos cargar este envio en este momento. Intentalo de nuevo.',
          invalidType: 'Este tipo de envio no es compatible.',
          backToDashboard: 'Volver al panel',
          descriptionLabel: 'Descripcion',
          galleryTitle: 'Imagenes',
          additionalContacts: 'Datos de contacto adicionales',
        },
        content: {
          eyebrow: 'Contenido publicado',
          title: 'Gestionar destacados',
          description:
            'Elige que eventos, restaurantes y tours publicados deben aparecer en las filas destacadas del sitio.',
          loading: 'Cargando contenido publicado...',
          error:
            'No pudimos cargar el contenido publicado en este momento. Intentalo de nuevo.',
          empty: 'No hay contenido publicado en esta seccion por ahora.',
          featured: 'Destacado',
          notFeatured: 'No destacado',
          summary: {
            count: '{{count}} de {{cap}} espacios destacados usados',
          },
          links: {
            submissions: 'Volver a revision de envios',
          },
          actions: {
            add: 'Agregar a destacados',
            remove: 'Quitar de destacados',
            edit: 'Editar',
            delete: 'Eliminar',
            open: 'Abrir pagina publica',
            dismiss: 'Cerrar',
          },
          featureUpdated: 'El contenido destacado se actualizo.',
          delete: {
            title: 'Archivar publicacion',
            description:
              '¿Archivar "{{title}}"? Se quitara de la lista administrativa publicada y de las paginas publicas.',
            confirm: 'Archivar publicacion',
            cancel: 'Cancelar',
            deleting: 'Archivando...',
            success: 'La publicacion fue archivada.',
            error:
              'No pudimos archivar esta publicacion en este momento. Intentalo de nuevo.',
          },
          edit: {
            eyebrow: 'Publicacion activa',
            title: 'Editar publicacion',
            description:
              'Actualiza detalles, traducciones y medios de una publicacion en vivo sin afectar el flujo de revision pendiente.',
            loading: 'Cargando publicacion...',
            error:
              'No pudimos cargar esta publicacion en este momento. Intentalo de nuevo.',
            invalidType: 'Este tipo de contenido publicado no es compatible.',
            back: 'Volver al contenido publicado',
            save: 'Guardar cambios',
            saving: 'Guardando cambios...',
            cancel: 'Cancelar',
            success: 'La publicacion fue actualizada.',
            validationSummary:
              'Completa los campos obligatorios antes de guardar. Todavia faltan {{count}} campo(s).',
            mediaTitle: 'Medios de la publicacion',
            mediaSummary: '{{count}} de {{cap}} imagenes adjuntas',
            languages: {
              english: 'Ingles',
              spanish: 'Espanol',
            },
            actions: {
              upload: 'Subir imagenes',
              addUrl: 'Agregar URL de imagen',
              addMedia: 'Agregar URL',
              removeMedia: 'Quitar',
            },
            fields: {
              title: 'Titulo',
              name: 'Nombre',
              dateLabel: 'Etiqueta de fecha',
              venue: 'Lugar',
              organizerName: 'Nombre del organizador',
              description: 'Descripcion',
              vibe: 'Ambiente',
              privateOrShared: 'Privado o compartido',
              bestFor: 'Ideal para',
              difficulty: 'Dificultad',
              suitableForKids: 'Apto para ninos',
              meetingPoint: 'Punto de encuentro',
              providerName: 'Nombre del proveedor',
              whatsapp: 'WhatsApp',
              phone: 'Telefono',
              website: 'Sitio web',
              instagram: 'Instagram',
              facebook: 'Facebook',
              email: 'Correo',
              operatorName: 'Nombre del operador',
              operatorWhatsapp: 'WhatsApp del operador',
              operatorInstagram: 'Instagram del operador',
              operatorWebsite: 'Sitio web del operador',
              operatorPrimaryContactMethod: 'Metodo principal de contacto del operador',
              included: 'Incluye',
              whatToBring: 'Que llevar',
              operatorDescription: 'Descripcion del operador',
            },
          },
        },
      },
      home: {
        loading: 'Cargando inicio...',
        error:
          'No pudimos cargar la pagina principal en este momento. Intentalo de nuevo.',
        eventsEmptyDescription:
          'Por ahora no hay eventos proximos para destacar aqui, pero aun puedes enviar uno para revision.',
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
        errorEyebrow: 'Actualizacion de eventos',
        errorTitle: 'No pudimos cargar los proximos eventos.',
        error:
          'No pudimos cargar los eventos en este momento. Intentalo de nuevo.',
        emptyEyebrow: 'Eventos en Bacalar',
        emptyUpcomingTitle: 'Actualmente no hay eventos proximos.',
        emptyUpcomingDescription:
          'Vuelve pronto para ver nuevas publicaciones o envia un evento para revision.',
        detailUnavailableEyebrow: 'Evento no disponible',
        detailUnavailableTitle: 'Este evento ya no esta disponible.',
        detailUnavailableDescription:
          'Es posible que el enlace este desactualizado o que la publicacion ya no siga activa.',
        submitCta: {
          eyebrow: 'Organizas algo en Bacalar?',
          title: 'Envia un evento para revision',
          description:
            'Comparte los detalles de tu evento y lo revisaremos antes de publicarlo.',
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
            address: 'Direccion',
            mapUrl: 'URL del mapa',
            mapEmbedUrl: 'URL embebida de Google Maps',
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
        listAriaLabel: 'Lista de eventos',
        featured: {
          ariaLabel: 'Eventos destacados',
          eyebrow: 'Destacados ahora',
          title: 'Nuestras mejores recomendaciones de esta semana.',
          description:
            'Una fila curada de planes oportunos que vale la pena revisar antes de filtrar mas.',
        },
        detailEyebrow: 'Evento destacado',
        detailMetaAriaLabel: 'Detalles del evento',
        galleryAriaLabel: 'Galeria de imagenes del evento',
        thisWeekNote:
          'Explora todos los eventos por categoria',
        loadMore: 'Cargar mas eventos',
        loadingMore: 'Cargando mas eventos...',
        backToList: 'Volver a Eventos',
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
        sections: {
          about: 'Sobre este evento',
        },
        sidebar: {
          title: 'Planea este evento',
        },
      },
      restaurants: {
        loading: 'Cargando restaurantes...',
        error:
          'No pudimos cargar los restaurantes en este momento. Actualiza o prueba otro idioma.',
        submitCta: {
          eyebrow: 'Conoces una buena mesa en Bacalar?',
          title: 'Conoces un restaurante que deberiamos destacar?',
          description:
            'Comparte los detalles y lo revisaremos antes de sumarlo a la guia.',
          action: 'Enviar un restaurante',
        },
        submit: {
          eyebrow: 'Envio publico',
          title: 'Enviar un restaurante',
          description:
            'Mandanos los datos clave de la ficha, el contacto e imagenes opcionales. Todo queda privado y pendiente hasta revision.',
          action: 'Enviar solicitud',
          submitting: 'Enviando solicitud...',
          optional: 'Opcional',
          error:
            'No pudimos enviar tu restaurante en este momento. Revisa los datos e intentalo de nuevo.',
          successEyebrow: 'Solicitud recibida',
          successTitle: 'Gracias, ya recibimos tu restaurante',
          successDescription:
            'Tu envio quedo pendiente de revision y aun no esta publicado.',
          successNote:
            'Nuestro equipo revisara los datos, imagenes y encaje editorial antes de decidir si lo promueve a la guia curada de restaurantes.',
          submitAnother: 'Enviar otro restaurante',
          fields: {
            name: 'Nombre del restaurante',
            cuisine: 'Cocina',
            moment: 'Momento de comida',
            priceBand: 'Rango de precio',
            address: 'Direccion',
            mapUrl: 'URL del mapa',
            mapEmbedUrl: 'URL embebida de Google Maps',
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
              'Agrega hasta 6 imagenes en total entre archivos y enlaces externos.',
            count: '{{count}} de {{max}} imagenes adjuntas',
            uploadLabel: 'Subir imagenes',
            uploadHint: 'JPG, PNG o WEBP. Hasta 5 MB cada una.',
            externalUrlLabel: 'URLs externas de imagen',
            externalUrlHint: 'Verificaremos el enlace antes de aceptarlo.',
            addUrl: 'Agregar URL',
            selectedUploads: 'Archivos seleccionados',
            selectedLinks: 'Enlaces seleccionados',
            remove: 'Quitar',
            none: 'Todavia no hay nada agregado.',
          },
          validation: {
            required: 'Este campo es obligatorio.',
            maxImages: 'Puedes adjuntar hasta {{count}} imagenes.',
            fileType: 'Usa solo imagenes JPG, PNG o WEBP.',
            fileSize: 'Cada imagen debe pesar menos de {{maxSize}}.',
            urlRequired: 'Ingresa una URL de imagen antes de agregarla.',
            urlFormat: 'Ingresa una URL de imagen valida con http o https.',
            urlImageType: 'Usa una URL de imagen JPG, PNG o WEBP.',
          },
        },
        categoryNavLabel: 'Categorias de restaurantes',
        listAriaLabel: 'Lista de restaurantes',
        listNote:
          'Explora restaurantes por momento del dia',
        featured: {
          ariaLabel: 'Restaurantes destacados',
          eyebrow: 'Destacados',
          title: 'Empieza con las mejores comidas del momento',
          description:
            'Una fila rapida de paradas confiables antes de filtrar mas la lista.',
        },
        loadMore: 'Cargar mas restaurantes',
        loadingMore: 'Cargando mas restaurantes...',
        emptyTitle: 'No hay restaurantes para este momento ahora mismo.',
        emptyDescription:
          'Prueba otra categoria o vuelve despues para ver mas opciones de {{category}}.',
        detailEyebrow: 'Restaurante destacado',
        detailMetaAriaLabel: 'Detalles del restaurante',
        galleryAriaLabel: 'Galeria de imagenes del restaurante',
        backToList: 'Volver a Restaurantes',
        backHome: 'Volver a inicio',
        categories: {
          all: 'Todos',
          breakfast: 'Desayuno',
          lunch: 'Almuerzo',
          dinner: 'Cena',
        },
        meta: {
          cuisine: 'Cocina',
          vibe: 'Ambiente',
          price: 'Precio',
          moment: 'Mejor para',
        },
        sections: {
          about: 'Sobre este restaurante',
        },
        sidebar: {
          title: 'De un vistazo',
        },
      },
      tours: {
        loading: 'Cargando tours...',
        error:
          'No pudimos cargar los tours en este momento. Actualiza o prueba otro idioma.',
        submitCta: {
          eyebrow: 'Conoces un gran tour en Bacalar?',
          title: 'Conoces un tour que deberiamos destacar?',
          description:
            'Comparte los detalles del tour y los revisaremos antes de sumarlo a la guia.',
          action: 'Enviar un tour',
        },
        submit: {
          eyebrow: 'Envio publico',
          title: 'Enviar un tour',
          description:
            'Mandanos los datos base del tour, contacto e imagenes opcionales. Todo queda privado y pendiente hasta revision.',
          action: 'Enviar solicitud',
          submitting: 'Enviando solicitud...',
          optional: 'Opcional',
          error:
            'No pudimos enviar tu tour en este momento. Revisa los datos e intentalo de nuevo.',
          successEyebrow: 'Solicitud recibida',
          successTitle: 'Gracias, ya recibimos tu tour',
          successDescription:
            'Tu envio quedo pendiente de revision y aun no esta publicado.',
          successNote:
            'Nuestro equipo revisara los datos, medios y encaje antes de decidir si lo promueve a la guia curada de tours.',
          submitAnother: 'Enviar otro tour',
          fields: {
            name: 'Nombre del tour',
            category: 'Categoria',
            durationHours: 'Duracion en horas',
            priceFrom: 'Precio desde',
            address: 'Direccion',
            mapUrl: 'URL del mapa',
            mapEmbedUrl: 'URL embebida de Google Maps',
            description: 'Descripcion',
            included: 'Que incluye',
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
        categoryNavLabel: 'Categorias de tours',
        listAriaLabel: 'Lista de tours',
        listNote:
          'Explora tours primero y compara operadores de un vistazo.',
        featured: {
          ariaLabel: 'Tours destacados',
          eyebrow: 'Destacados ahora',
          title: 'Nuestras recomendaciones principales',
          description:
            'Nuestros tours favoritos para ayudarte a empezar.',
        },
        detailEyebrow: 'Tour destacado',
        detailMetaAriaLabel: 'Detalles del tour',
        galleryAriaLabel: 'Galeria de imagenes del tour',
        loadMore: 'Cargar mas tours',
        loadingMore: 'Cargando mas tours...',
        emptyTitle: 'No hay tours para esta categoria en este momento.',
        emptyDescription:
          'Prueba otra categoria o vuelve despues para ver mas opciones de {{category}}.',
        backToList: 'Volver a Tours',
        backHome: 'Volver a inicio',
        providedBy: 'Operado por {{operator}}',
        providerEyebrow: 'Operado por',
        actions: {
          contactOperator: 'Contactar al operador',
          checkAvailability: 'Consultar disponibilidad',
          messageOnInstagram: 'Enviar mensaje por Instagram',
        },
        sidebar: {
          title: 'Planea este tour',
          operator: 'Operador',
        },
        bestForLabel: 'Ideal para: {{value}}',
        categories: {
          all: 'Todos',
          premium: 'Premium',
          group: 'Grupo',
          adventure: 'Aventura',
        },
        hours_one: '{{count}} hora en el agua',
        hours_other: '{{count}} horas en el agua',
        priceFrom: 'Desde {{price}}',
        meta: {
          category: 'Categoria',
          duration: 'Duracion',
          price: 'Desde',
          privateOrShared: 'Privado o compartido',
          bestFor: 'Ideal para',
          difficulty: 'Dificultad',
          suitableForKids: 'Apto para ninos',
        },
        sections: {
          about: 'Sobre este tour',
          included: 'Que incluye',
          includedFallback:
            'El operador del tour todavia no ha compartido esta informacion. Contactalo para confirmar que incluye el precio de tu tour',
          whatToBring: 'Que llevar',
          meetingPoint: 'Punto de encuentro',
          operator: 'Operador del tour',
        },
        operator: {
          name: 'Operador',
          whatsapp: 'WhatsApp',
          instagram: 'Instagram',
          website: 'Sitio web',
          primaryContactMethod: 'Metodo principal de contacto',
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
