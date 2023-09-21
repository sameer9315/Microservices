const {sendResponse}= require('../MiddleWares/response');

const mongoOperations= require('../mongooseOperations');

exports.register=async(req,res)=>{
  const {name,email, password}= (req.body);
  const data={
    name,
    email,
    password,
  }
//   console.log(data);
  const message= await mongoOperations.registerUser(data);
  sendResponse(res,res.statusCode,message);
}