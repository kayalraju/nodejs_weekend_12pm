const Category=require('../models/category')
const Prodect=require('../models/prodect')




class LookupController{


    async createCategory(req,res){
        try{
            const data= await Category.create(req.body)
            return res.status(200).json({
                msg:"Category Created Successfully",
                data:data
            })

        }catch(error){
            console.log(error);
            
        }
    }

    async getCategory(req,res){
        try{
            const data= await Category.find()
            return res.status(200).json({
                msg:"Category Fetched Successfully",
                data:data
            })

        }catch(error){
            console.log(error);
            
        }
    }


    async createProduct(req,res){
        try{

            const {name,price,category}=req.body
            const data= await Prodect({
                name,
                price,
                category
            })
            const data1= await data.save()
            return res.status(200).json({
                msg:"Product Created Successfully",
                data:data1
            })

        }catch(error){
            console.log(error);
            
        }
    }

    //user lookup category wite product

    async getProduct(req,res){
        try{
            const data= await Prodect.aggregate([
                {
                    $lookup:{
                        from:"categories",
                        localField:"category",
                        foreignField:"_id",
                        as:"category_details"
                    }
                },
                {
                     $unwind: "$category_details"
                },
                {
                    $group: {
                    _id: "$category_details.name",
                    products: {   
                        $push: {
                        _id: "$_id",
                        name: "$name",
                        price: "$price"
                        }
                    }
                    }
                },
                {
                    $project: {
                    _id: 0,
                    category: "$_id",
                    products: 1
                    }
                }
                // {
                //     $unwind:"$category_details"
                // }

                // {
                //     $project:{
                //         name:1,
                //         price:1,
                //         "category_details.name":1
                //     }
                // }

                //user group catgeory wise product
                // {
                //     $group:{
                //         _id:"$category",
                //         products:{$push:"$$ROOT"}
                //     }
                // }

                // {
                //     $group:{
                //         _id:"$category",
                //         products:{$push:"$$ROOT"},
                //         count:{$sum:1}
                //     }
                // }

                //group product with category
                // {
                //     $group:{
                //         _id:"$category",
                //        category_details:{$first:"$$ROOT"},
                       
                //         count:{$sum:1}
                //     }
                // }
            ])
            return res.status(200).json({
                msg:"Product Fetched Successfully",
                data:data
            })

        }catch(error){
            console.log(error);
            
        }
    }


}




module.exports=new LookupController()