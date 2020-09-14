/**
 * @file Environment configuration used for integration builds. With integration,
 * we refer to a development phase in which the client is build inside the server,
 * but without the container environment. For this reason, the fake backend is disabled,
 * and also the service worker, to make it easier to debug. THe API URL is the one used
 * for the local server.
 */
export const environment = {
  production: false,
  fakeBackend: false,
  apiUrl: 'http://localhost:3000'
};
