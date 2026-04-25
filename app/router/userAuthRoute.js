const express=require('express')
const userAuthController = require('../controller/UserAuthController')
const AuthCheck = require('../middleware/auth')
const adminAuthController = require('../controller/adminAuthController')
const AuthCheckAdmin = require('../middleware/adminAuthCheck')
const router=express.Router()




router.post('/register',userAuthController.Register)
router.post('/verify/email',userAuthController.verifyEmail)
router.post('/login',userAuthController.login)
router.get('/dashboard',AuthCheck,userAuthController.dashboard)




//admin login route
router.post('/admin/login',adminAuthController.adminlogin)
router.get('/admin/dashboard',AuthCheckAdmin,adminAuthController.admindashboard)



module.exports=router