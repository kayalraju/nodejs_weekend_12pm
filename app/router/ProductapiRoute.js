const express=require('express')
const ProductController = require('../controller/ProductController')

const router=express.Router()


router.post('/product/crearte',ProductController.createProduct)
router.get('/product',ProductController.getProduct)
router.get('/product/edit/:id',ProductController.getProductById)
router.put('/product/update/:id',ProductController.updateProduct)
router.delete('/product/delete/:id',ProductController.deleteProduct)



module.exports=router