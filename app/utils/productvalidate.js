const joi=require('joi')

const productSchemaValidation=joi.object({
    name:joi.string().required().min(3).max(30),
    price:joi.number().required(),
    category:joi.string().required(),
  
})
module.exports=productSchemaValidation
