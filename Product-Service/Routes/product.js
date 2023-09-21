const express = require("express");
const router = express.Router();
const tryCatchWrapper= require('../Middlewares/trycatch');
const productController = require("../Controllers/product");
const productBuyController= require('../Controllers/buyProduct');
const {Product}= require('../Model/product');
const mongoOperations= require('../mongooseOperations');
const {sendResponse}= require('../Middlewares/response');
const {message_sent}=require('../constants');

router.post("/create",  tryCatchWrapper(productController.createProduct));


router.post("/buy", async (req,res)=>{
    const id=req.body.id;
    const result=await mongoOperations.findProduct(id);
    if(result){
        const data={
            id: result._id,
            price: result.price,
            name: result.name,
            description: result.description,
            email: req.user.email,
        }
    await productBuyController.produceMessage(data);
    sendResponse(res, res.statusCode, message_sent)

    // res.json({message: 'Product details sent to kafaka'});
    }
}
    )

module.exports = router;