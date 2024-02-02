"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const store = new product_1.ProductStore();
describe('Product Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('index method should return a list of Products', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    // it('show method should return the correct Product', async () => {
    //   const result = await store.show('1');
    //   expect(result).toEqual({
    //     id: '1',
    //     name: 'test',
    //     price: 100,
    //     category: 'test'
    //   });
    // });
});
