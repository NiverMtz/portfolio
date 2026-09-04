export const environment = {
  production: false,
  i18n: './assets/i18n/',
  // El formulario de contacto llama a esta función serverless (Vercel),
  // que guarda la access key de Web3Forms como variable de entorno del servidor.
  contactEndpoint: '/api/contact',
};
