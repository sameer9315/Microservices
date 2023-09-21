const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const { User } = require('./Models/user');
const {   errorEmailMessage}=require('./constants');
const {errorLoginMessage} =require('./constants');
const createError=require('http-errors');
const jwt= require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
module.exports={
  registerUser: async (userData) => {
    let echeck = await User.findOne({ email: userData.email});
    if (echeck ) {
      throw createError(400, errorEmailMessage);
    }else {
      const user = new User({
        email: userData.email,
        password: userData.password,
        name: userData.name,
    });
    await user.save();
    return user;
    }
  },
  login : async (userdata) => {
    const user=await User.findOne({email: userdata.email});
    if (!user) {
      throw createError(401, errorLoginMessage);
    }
    const validPassword = await bcrypt.compare(userdata.password, user.password);
    if (!validPassword) {
      throw createError(401,errorLoginMessage);
    }
    const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        process.env.Private_Key,
        {
          expiresIn: process.env.Expire_Time,
        }
      );
    return {token, expiresIn: 3600,
        userId: user._id};
  },
}