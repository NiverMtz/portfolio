export const environment = {
  production: false,
  i18n: './assets/i18n/',
  // El formulario de contacto llama a esta función serverless (Vercel), que
  // reenvía a Formspree usando FORMSPREE_ENDPOINT (variable de entorno del server).
  contactEndpoint: '/api/contact',
};
