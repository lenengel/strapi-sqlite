'use strict';

/**
 *  orderProducts controller
 */
 //const { createCoreController } = require('@strapi/strapi').factories;
 
 //module.exports = createCoreController('api::order.order', ({ strapi }) =>  ({
 

module.exports = {
  async create(ctx) { // CREATE ORDER
    let orderdProducts = [];
    try {
      for (const order of ctx.request.body.data.order) {
        const response = await strapi.service('api::ordered-product.ordered-product').create({
          data: {
          quantity: parseInt(order.quantity),
          unit:  parseFloat(order.unit),
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
      ctx.response.body = {err: "POST /orderedproducts"};
      ctx.response.status = 500;
    } 
  },
  async find(ctx) { // called by GET /orderedproducts
    const entries = await strapi.entityService.findMany('api::order.order', {
      populate: {
        ordered_products: {
          populate: {
            product: true,
          },
        },
      },
    });

    ctx.response.body = entries; // we could also send a JSON
    ctx.response.status = 200;
  },
  async findOne(ctx) { // called by GET /orderedproducts
    const { id } = ctx.params;
    const entry =  await strapi.entityService.findOne('api::order.order', id, {
      populate: {
        ordered_products: {
          populate: {
            product: {
              populate: {
                product_units : true
              }
            }
          },
        },
      },
    });
    
    ctx.response.body = entry; // we could also send a JSON
    ctx.response.status = 200;
  },
  async delete(ctx) { // called by DELETE /orderedproducts
    const { id } = ctx.params;

    try {
      const order = await strapi.entityService.delete('api::order.order', id, {
        populate: ['ordered_products']
      });
      for(const orderedProduct of order.ordered_products) {
        const reply = await strapi.entityService.delete('api::ordered-product.ordered-product', orderedProduct.id);
      }
      
      ctx.response.body = "OK"; // we could also send a JSON
      ctx.response.status = 200;
    } catch (err) {
      console.error(err);
      ctx.response.body = {err: "DELETE /orderedproducts/:id"};
      ctx.response.status = 500;
    }
  },
 };