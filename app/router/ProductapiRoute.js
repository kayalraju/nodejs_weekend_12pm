const express=require('express')
const ProductController = require('../controller/ProductController')
const ProductEjsController = require('../controller/ProductEjsController')
const multerUpload = require('../utils/Multer')

const router=express.Router()

//for api
router.post('/product/crearte',multerUpload.single('image'),ProductController.createProduct)
router.get('/product',ProductController.getProduct)
router.get('/product/edit/:id',ProductController.getProductById)
router.put('/product/update/:id',ProductController.updateProduct)
router.delete('/product/delete/:id',ProductController.deleteProduct)

//for ejs

router.get('/product/list',ProductEjsController.list)
router.get('/product/add',ProductEjsController.add)
router.post('/product/store',ProductEjsController.store)
router.get('/product/:id/edit',ProductEjsController.editView)
router.post('/product/:id/update',ProductEjsController.updateProduct)
router.get('/product/:id/delete',ProductEjsController.delete)

module.exports=router