const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor() {
    this.products = [];
    for (let i = 1; i <= 100; i++) {
      this.products.push({
        id: i,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  list(query) {
    const { size = 10 } = query;
    const tempProducts = [...this.products];
    return tempProducts.splice(0, size);
  }

  getById(id) {
    const product = this.products.find(p => p.id == id);
    if(!product) {
      throw boom.notFound('Product not found.');
    }
    if(product.isBlocked) {
      throw boom.conflict('Product is blocked.');
    }
    return product;
  }

  create(body) {
    const id = this.products.length + 1;
    const {
      name,
      price,
    } = body;
    const product = {
      id,
      name,
      price,
      image: faker.image.imageUrl(),
      isBlocked: faker.datatype.boolean(),
    };
    this.products.push(product);
    return product;
  }

  update(id, body) {
    let productIndex = this.products.findIndex(p => p.id == id);
    if(productIndex === -1) {
      throw boom.notFound('Product not found.');
    }
    const product = {
      ...this.products[productIndex],
      ...body,
    };
    this.products[productIndex] = product;
    return product;
  }

  delete(id) {
    let productIndex = this.products.findIndex(p => p.id == id);
    if(productIndex === -1) {
      throw boom.notFound('Product not found.');
    }
    this.products.splice(productIndex, 1);
    return productIndex;
  }
}

module.exports = ProductsService;
