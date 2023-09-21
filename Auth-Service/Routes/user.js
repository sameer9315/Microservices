
const express = require('express');
const router = express.Router();
const {validateUser}=require('../MiddleWares/validateUser');
const signup=require('../Controllers/register');
const login= require('../Controllers/login');
const tryCatchWrapper = require('../MiddleWares/trycatch');


router.post('/signup',validateUser,tryCatchWrapper(signup.register));
router.post('/login',tryCatchWrapper(login.signin));

module.exports=router;