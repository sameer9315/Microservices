const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const AuthRoutes = require("./Routes/user");
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
    console.log("Connected to AuthService DB");
  })
  .catch((err) => {
    console.log(err);
  });
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Hello, world!",
  });
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});

app.use("/auth", AuthRoutes);

module.exports = app;
