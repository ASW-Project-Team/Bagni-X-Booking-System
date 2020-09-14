/**
 * @file Default dev mode. This is the base configuration used in the ng serve builds (without a
 * real backend), so the fake backend is enabled.
 */
export const environment = {
  production: false,
  fakeBackend: true,
  apiUrl: 'http://localhost:4200'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
