const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {Kafka} = require("kafkajs");
const mongoOperations=require('./mongooseOperatons');
const OrderRoutes = require("./Router/order");
const app = express();

mongoose
  .connect(
    "mongodb+srv://kumarsameer2001:micro@services.4vsrgry.mongodb.net/Orders",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to OrderService DB");
  })
  .catch((err) => {
    console.log(err);
  });

const port =  3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const kafka= new Kafka({
    clientId: 'consumer',
    brokers:['localhost:9092'],

})
const consumer=kafka.consumer({groupId:'order-group'});
async function consumeAndStoreOrder(){
    await consumer.connect();
    await consumer.subscribe({topic: 'order',fromBeginning: true});
    await consumer.run({
        eachMessage: async({topic , partition, message})=>{
            try{
                const orderData=JSON.parse(message.value.toString('utf-8'));
                console.log(orderData);
                const order=await mongoOperations.saveOrder(orderData);
                if(order){console.log('Order Save', order)}
            }catch(error){
                console.error('Error', error)
            }
        }
    })
}

consumeAndStoreOrder().catch((error)=>{
    console.error('Consumer Error', error);
})



app.listen(port, () => {
  console.log("Order Server listening on port " + port);
});

app.use("/orders", OrderRoutes);

module.exports = app;

