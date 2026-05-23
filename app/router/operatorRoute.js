const express=require('express')
const OpeRatorController = require('../controller/OpeRatorController')

const router=express.Router()




router.post('create/operator',OpeRatorController.createOperator)
router.get('/eq',OpeRatorController.eq)


module.exports=router