/**
 * @file Environment configuration used for gh-pages builds. This is a client demo
 * without backend, so the fake backend is used, and the service worker is enabled,
 * to show the PWA features of the app.
 */
export const environment = {
  production: false,
  fakeBackend: true,
  apiUrl: 'https://asw-project-team.github.io/Bagni-X-Booking-System'
};
