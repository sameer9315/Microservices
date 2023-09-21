const mongoose=require('mongoose');

const { Product } = require('./Model/product');
const createError=require('http-errors');
const {not_found,created }=require('./constants');

module.exports={
  createProduct: async(data)=>{
    const { name, description, price } = data;
    const newProduct = new Product({ name, description, price });
    await newProduct.save();
    return {message: created,
        product: newProduct};
  
},
    findProduct: async(id)=>{
        const product = await Product.findById(id);
        if(product){
            return product;
        }
        throw createError(404,not_found );
    }   
}