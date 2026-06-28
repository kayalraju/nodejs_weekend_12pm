const express=require('express')
const LookupController = require('../controller/LookupController')
const router=express.Router()




router.post('/create/category',LookupController.createCategory)
router.get('/category',LookupController.getCategory)

//create product
router.post('/create/product',LookupController.createProduct)
router.get('/product',LookupController.getProduct)





module.exports=router