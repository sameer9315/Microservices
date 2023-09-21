const mongoose=require('mongoose');
const {model_user}=require('../constants');
const bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;
const userSchema=new mongoose.Schema({
    name: {type: String, required: true},
    email:{
      type: String,
      required: true,
      min: [5],
      max: [32],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
      },
    password: {type: String, required: true},
});

userSchema.pre('save', async function(next){
    if(this.isNew){
        this.password=await bcrypt.hash(this.password,SALT_WORK_FACTOR);
    }
    next();
})

const User=mongoose.model(model_user,userSchema);
exports.User = User;



