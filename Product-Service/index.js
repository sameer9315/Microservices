const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const product = require("./Model/product");
const isAuthenticated = require("./Middlewares/authenticationCheck");
const productRoutes = require("./Routes/product");
const app = express();

mongoose
  .connect(
    "mongodb+srv://kumarsameer2001:micro@services.4vsrgry.mongodb.net/Users",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to ProductService DB");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("Product Server listening on port " + port);
});

app.use("/products", isAuthenticated, productRoutes);

module.exports = app;





// app.post("/products/buy", isAuthenticated, async (req, res) => {
//   const { ids } = req.body;
//   const product = await Product.findById(ids);
//   console.log(product);

//   console.log("sending to order queue");

//   await res.json({
//     message: 'Order placed successfully',
//     result: order
//   });
// });

// =====================rabbitMQ =========
// let channel, connection, order;
// async function connect() {
//   try {
//     const amqpServer = "amqp://localhost:5672";
//     connection = await amqp.connect(amqpServer);
//     channel = await connection.createChannel();
//     await channel.assertQueue("PRODUCT");
//   } catch (err) {
//     console.log(err);
//   }
// }
// connect().then(() => {
//   console.log("RabbitMQ connection established");
// });

//===================================================



//   channel.consume("PRODUCT", (data) => {
//     console.log("Consuming Product Queue");
//     order = JSON.parse(data.content);
//     channel.ack(data);
//   });


//   channel.sendToQueue(
//     "ORDER",
//     Buffer.from(
//       JSON.stringify({
//         product,
//         userEmail: req.user.email,
//       })
//     )
//   );