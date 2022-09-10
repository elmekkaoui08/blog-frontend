// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const baseUrl = 'http://localhost:8000/api';

export const environment = {
  production: false,
  api: {
    auth:{
      login: `${baseUrl}/token`,
      forgotPassword: `${baseUrl}/forgot-password`,
      createUser: `${baseUrl}/register`,
      resetPassword: `${baseUrl}/reset-password`
    },
    posts:{
      list:  `${baseUrl}/posts`,
      retrieveUpdateDelete: `${baseUrl}/posts/`,
    },
    users: {
      details: `${baseUrl}/users/`,
      list: `${baseUrl}/users`,
      create: `${baseUrl}/users/add`,
      deleteUser: `${baseUrl}/users/`,
    },
    categories:{
      list: `${baseUrl}/categories`,
      details: `${baseUrl}/categories/`,
    },
    articles:{
      create: `${baseUrl}/articles/add`,
      update: `${baseUrl}/articles/`,
    },
    comments: {
      create: `${baseUrl}/comments/add`
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
