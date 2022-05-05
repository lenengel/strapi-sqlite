'use strict';

/**
 *  orderProducts controller
 */
 //const { createCoreController } = require('@strapi/strapi').factories;
 
 //module.exports = createCoreController('api::order.order', ({ strapi }) =>  ({
 

 module.exports = {
    async create(ctx, next) { // CREATE ORDER
        let orderdProducts = [];
        try {
            for (const order of ctx.request.body.data.order) {
                const response = await strapi.service('api::ordered-product.ordered-product').create({
                    data: {
                    quantity: parseInt(order.quantity),
                    product: order.id,
                }});
                orderdProducts.push(response.id);
            }
        
            const responseOrder = await strapi.service('api::order.order').create({
                data: {
                    firstname: ctx.request.body.data.firstname,
                    lastname: ctx.request.body.data.lastname,
                    street: ctx.request.body.data.street,
                    zipcode: ctx.request.body.data.zipcode,
                    city: ctx.request.body.data.city,
                    phone: ctx.request.body.data.phone,
                    email: ctx.request.body.data.email,
                    ordered_products: orderdProducts,
                }
            });
            ctx.response.status = 201;
        } catch (err) {
            console.error(err);
            if (err instanceof SomeCustomError) {
              return ctx.send(err.body, err.status);
            }
        } 
    },
    async find(ctx, next) { // called by GET /hello 
      ctx.body = 'Hello World!'; // we could also send a JSON
    },
 };