
const {Product} = require("../Model/product");
const {sendResponse}= require('../Middlewares/response');
const tryCatchWrapper = require('../Middlewares/trycatch');

const mongoOperations= require('../mongooseOperations');


exports.createProduct = async (req, res) => {

        const { name, description, price } = req.body;
        const data={
            name,description,price
        }
        const message=await mongoOperations.createProduct(data);
        
        sendResponse(res,res.statusCode,message);
};












    // })
    
//   try {
//     const { name, description, price } = req.body;
//     const newProduct = new Product({ name, description, price });
//     await newProduct.save().then((result) => {
//       res.status(200).json({
//         message: "Product created successfully",
//         product: result,
//       });
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: "failed",
//       message: "Internal Server Error",
//     });
//   }
// exports.buyProduct = async (req, res, next) => {
//   const { ids } = req.body;
//   try {
//     await Product.find({ _id: { $in: ids } }).then((result) => {
//       console.log(result);

//       productRabbit.channel.sendToQueue(
//         "ORDER",
//         Buffer.from(
//           JSON.stringify({
//             product: result,
//             userEmail: req.user.email,
//           })
//         )
//       ).then(() => { 
//         console.log("product order sent to queue")
//       });
//       res.status(201).json({
//         message: "Product order placed successfully",
//         product: result,
//       });
//     });
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({
//       message: "couldn't place product order",
//     });
//   }
// };