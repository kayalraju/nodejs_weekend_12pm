const express=require('express')
const router=express.Router()
const AuthEjsRouter=require('./authejsRoute')
const HomeRoute=require('./homeRoute')
const OperatorRoute=require('./operatorRoute')
const ProductRoute=require('./ProductapiRoute')
const UserAuthRoute=require('./userAuthRoute')






router.use(AuthEjsRouter)
router.use(HomeRoute)
router.use(OperatorRoute)
router.use('/api',ProductRoute)
router.use('/api',UserAuthRoute)





module.exports=router