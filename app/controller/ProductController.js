
const Product=require('../models/Product')

class ProductController{


    async createProduct(req,res){
        //console.log(req.body);
        try{
            const {name,price,category}=req.body

            const prod= new Product({
                name,
                price,
                category
            })

           const data= await prod.save()
            return res.status(200).json({
                status:true,
                message:'Product Created Successfully',
                data:data
            })


        }catch(error){
            return res.status(500).json({
                status:false,
                message:error.message
            })
        }

    }


    async getProduct(req,res){
        try{
            const data= await Product.find()
            return res.status(200).json({
                status:true,
                message:'Product Fetched Successfully',
                total:data.length,
                data:data
            })
        }catch(error){
            return res.status(500).json({
                status:false,
                message:error.message
            })
        }
    }
   
}




module.exports=new ProductController()