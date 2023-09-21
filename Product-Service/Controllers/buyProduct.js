const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'producer',
  brokers: ['localhost:9092'],
});

const producer=kafka.producer();
produceMessage=async function (data){
    await producer.connect();
    const productDetails={
        productId: data.id,
        price: data.price,        
        email: data.email,
    }
    const message={value: JSON.stringify(productDetails)};
    const messages=[message];
    try{
        await producer.send({
            topic: 'order',
            messages,
        });
        console.log('Message Sent Successfully');
    }catch(error){
        console.error('Error message',error);
    }finally{
        await producer.disconnect();
    }
}
module.exports={produceMessage}