const {sendResponse}= require('../MiddleWares/response');

const mongoOperations= require('../mongooseOperations');


exports.signin=async(req,res)=>{
  const {email, password}=req.body;
  const data={
    email,
    password,
  }
  const message= await mongoOperations.login(data);
  sendResponse(res,res.statusCode,message);
}