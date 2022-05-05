'use strict';

/**
 * orderproducts router.
 */

module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'POST',
        path: '/orderproducts',
        handler: 'orderproducts.create',
        config: {
          auth: false,
        },
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/orderproducts',
        handler: 'orderproducts.find',
        config: {
          auth: false,
        },
      }
    ]
  };