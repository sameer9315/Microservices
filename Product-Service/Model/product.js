const mongoose = require("mongoose");
const {model_product}= require('../constants');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    created_at:{
        type: Date,
        default: Date.now(),
    }
});

const Product = mongoose.model(model_product, productSchema);
exports.Product = Product;
