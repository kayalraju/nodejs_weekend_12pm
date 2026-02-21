const express=require('express')
const ProductController = require('../controller/ProductController')

const router=express.Router()


router.post('/product/crearte',ProductController.createProduct)
router.get('/product',ProductController.getProduct)



module.exports=router