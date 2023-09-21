const {Order} = require('./Model/order');



module.exports={
    saveOrder: async(orderData)=>{
        const newOrder= new Order({
            productId: orderData.productId,
            user: orderData.email,
            totalPrice: orderData.price,
        });
        await newOrder.save();
        return newOrder;
    }
}