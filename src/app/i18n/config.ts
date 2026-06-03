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
          admin: 'Admin',
          logout: 'Log out',
        },
      },
      common: {
        loading: 'Loading...',
        error: 'Something went wrong. Please try again.',
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
        listAriaLabel: 'Events list',
        featured: {
          ariaLabel: 'Featured events',
          eyebrow: 'Featured now',
          title: 'Start with the strongest event picks',
          description:
            'A curated row of timely moments worth considering before you filter deeper.',
        },
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
        error:
          'We could not load restaurants right now. Please refresh or try another language.',
        submitCta: {
          eyebrow: 'Know a strong Bacalar table?',
          title: 'Submit a restaurant for review',
          description:
            'Share the basics, contact details, and optional images so we can review it before it appears in the guide.',
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
          'Start with the strongest dining moment, then keep browsing by pace and timing.',
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
        backToList: 'See all restaurants',
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
      },
      tours: {
        loading: 'Loading tours...',
        error:
          'We could not load tours right now. Please refresh or try another language.',
        submitCta: {
          eyebrow: 'Know a great Bacalar tour?',
          title: 'Submit a tour for review',
          description:
            'Share the core experience details, contact info, and optional images so we can review it before it appears in the guide.',
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
        categoryNavLabel: 'Tour categories',
        listAriaLabel: 'Tours list',
        listNote:
          'Start with the strongest lagoon fit, then keep browsing by style and pace.',
        featured: {
          ariaLabel: 'Featured tours',
          eyebrow: 'Featured now',
          title: 'Start with the strongest tour picks',
          description:
            'A quick row of high-confidence lagoon experiences before you narrow the list.',
        },
        detailEyebrow: 'Featured tour',
        loadMore: 'Load more tours',
        loadingMore: 'Loading more tours...',
        emptyTitle: 'No tours match this category right now.',
        emptyDescription:
          'Try another category or come back later for more {{category}} options.',
        backToList: 'See all tours',
        backHome: 'Back to homepage',
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
          admin: 'Admin',
          logout: 'Cerrar sesion',
        },
      },
      common: {
        loading: 'Cargando...',
        error: 'Algo salio mal. Intentalo de nuevo.',
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
        listAriaLabel: 'Lista de eventos',
        featured: {
          ariaLabel: 'Eventos destacados',
          eyebrow: 'Destacados ahora',
          title: 'Empieza con los eventos mas fuertes del momento',
          description:
            'Una fila curada de planes oportunos que vale la pena revisar antes de filtrar mas.',
        },
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
        error:
          'No pudimos cargar los restaurantes en este momento. Actualiza o prueba otro idioma.',
        submitCta: {
          eyebrow: 'Conoces una buena mesa en Bacalar?',
          title: 'Envia un restaurante para revision',
          description:
            'Comparte los datos base, contacto e imagenes opcionales para revisarlo antes de incluirlo en la guia.',
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
          'Empieza con el mejor momento para comer y despues sigue explorando segun el ritmo del dia.',
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
        backToList: 'Ver todos los restaurantes',
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
      },
      tours: {
        loading: 'Cargando tours...',
        error:
          'No pudimos cargar los tours en este momento. Actualiza o prueba otro idioma.',
        submitCta: {
          eyebrow: 'Conoces un gran tour en Bacalar?',
          title: 'Envia un tour para revision',
          description:
            'Comparte los detalles clave, contacto e imagenes opcionales para revisarlo antes de que aparezca en la guia.',
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
        categoryNavLabel: 'Categorias de tours',
        listAriaLabel: 'Lista de tours',
        listNote:
          'Empieza con el estilo de laguna mas fuerte y luego sigue explorando por ritmo y formato.',
        featured: {
          ariaLabel: 'Tours destacados',
          eyebrow: 'Destacados ahora',
          title: 'Empieza con los tours mas fuertes',
          description:
            'Una fila rapida de experiencias de laguna con alta confianza antes de filtrar la lista.',
        },
        detailEyebrow: 'Tour destacado',
        loadMore: 'Cargar mas tours',
        loadingMore: 'Cargando mas tours...',
        emptyTitle: 'No hay tours para esta categoria en este momento.',
        emptyDescription:
          'Prueba otra categoria o vuelve despues para ver mas opciones de {{category}}.',
        backToList: 'Ver todos los tours',
        backHome: 'Volver a inicio',
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
