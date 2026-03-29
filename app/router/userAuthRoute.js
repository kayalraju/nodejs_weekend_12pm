const express=require('express')
const userAuthController = require('../controller/UserAuthController')
const AuthCheck = require('../middleware/auth')
const router=express.Router()




router.post('/register',userAuthController.Register)
router.post('/login',userAuthController.login)
router.get('/dashboard',AuthCheck,userAuthController.dashboard)



module.exports=router