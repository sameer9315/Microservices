const express = require('express');
const router = express.Router();

// const OrderController = require('../controller/orders')

router.get('/', async(req,res)=>{
    res.json({
        message: 'Order Route',
    })
})

module.exports = router;