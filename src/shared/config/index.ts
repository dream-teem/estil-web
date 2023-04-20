export const config = {
  api: {
    main: {
      baseUrl: process.env.NEXT_PUBLIC_MAIN_API_URL
    },
    socket: {
      baseUrl: process.env.NEXT_PUBLIC_SOCKET_URL
    },
    products: {
      baseUrl: process.env.NEXT_PUBLIC_PRODUCTS_API_URL
    },
    sms: {
      baseUrl: process.env.NEXT_PUBLIC_SMS_API_URL
    }
  },
  seo: {
    meta: {
      twitter: {
        creator: '@estil',
        site: '@estil'
      },
      og: {
        siteName: 'Estil',
        url: 'https://estil.kz'
      }
    }
  }
}
