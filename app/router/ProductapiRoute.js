const express=require('express')
const ProductController = require('../controller/ProductController')
const ProductEjsController = require('../controller/ProductEjsController')
const multerUpload = require('../utils/Multer')

const router=express.Router()

//for api
//router.post('/product/crearte',multerUpload.single('image'),ProductController.createProduct)
/**
* @swagger
* /api/product/crearte:
*   post:
*     summary: create Product
*     tags:
*       - Product
*     produces:
*       - application/json
*     parameters:
 *      - in: body
 *        name: Add product
 *        description: Add product in MongoDB.
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - price
 *            - category
 *          properties:
 *            name:
 *              type: string
 *            price:
 *              type: number
 *            category:
 *              type: string
 *     responses:
 *        200:
 *          description: product data added
 *        400:
 *          description: Bad Request
*        500:
*          description: Server Error
*/
router.post('/product/crearte',ProductController.createProduct)
/**
 * @swagger
 * /api/product:
 *  get:
 *    summary: Get all the product from Database
 *    tags:
 *       - Product
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: data fetched successfully.
 */
router.get('/product',ProductController.getProduct)
router.get('/product/edit/:id',ProductController.getProductById)
router.put('/product/update/:id',ProductController.updateProduct)
router.delete('/product/delete/:id',ProductController.deleteProduct)

//aggregate
router.get('/product/aggregate',ProductController.aggregateProduct)

//for ejs

router.get('/product/list',ProductEjsController.list)
router.get('/product/add',ProductEjsController.add)
router.post('/product/store',ProductEjsController.store)
router.get('/product/:id/edit',ProductEjsController.editView)
router.post('/product/:id/update',ProductEjsController.updateProduct)
router.get('/product/:id/delete',ProductEjsController.delete)

module.exports=router