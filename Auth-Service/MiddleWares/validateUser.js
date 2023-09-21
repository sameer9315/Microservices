const Joi=require('joi');
const {sendResponse}= require('./response');


  const schema= Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
  });

const validateUser=async(req,res,next)=>{
console.log(req.body.name);
  const {error}=schema.validate({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
  if(error){
    return sendResponse(res,res.statusCode,error.details[0].message);
  }
  next();
}
module.exports={
  validateUser,
};