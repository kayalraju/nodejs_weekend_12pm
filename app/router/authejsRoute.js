const express=require('express')
const AuthEjsController = require('../controller/AuthEjsController')
const AuthCheckForEjs = require('../middleware/authEjsCheck')

const router=express.Router()




router.get('/register/view',AuthEjsController.register)
router.post('/register/create',AuthEjsController.registerCreate)
router.get('/login/view',AuthEjsController.login)
router.post('/login/create',AuthEjsController.loginCreate)
router.get('/user/dashboard',AuthCheckForEjs,AuthEjsController.authcheck,AuthEjsController.dashboard)
router.get('/logout',AuthCheckForEjs,AuthEjsController.authcheck,AuthEjsController.logout)




module.exports=router