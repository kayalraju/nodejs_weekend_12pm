const express=require('express')
const HomeController = require('../controller/HomeController')
const router=express.Router()



// router.get('/',(req,res)=>{
//     res.send('<h1> welcome to Home Page</h1>')
// })


router.get('/', HomeController.homepage)
router.get('/about', HomeController.aboutpage)
router.get('/product',HomeController.product)

module.exports=router