const Product=require('../models/Product')

class ProductEjsController{

    async list(req,res){
        const product=await Product.find()
        return res.render('product/list',{
            data:product
        })
    }
    async add(req,res){
        return res.render('product/add')
    }
    async store(req,res){
       try{
       const {name,price,category}=req.body

            const prod= new Product({
                name,
                price,
                category
            })

           const data= await prod.save()
           if(data){
            return res.redirect('/product/list')
           }else{
            return res.redirect('/product/add')
           }

        
       }catch(error){
        console.log(error);
        
       }
    }


    async editView(req,res){
        try{
            const id=req.params.id
            const product=await Product.findById(id)
            return res.render('product/edit',{
                data:product
            })

        }catch(error){
            console.log(error);
            
        }
    }


    async updateProduct(req,res){
        try{
            const id=req.params.id
            const data=await Product.findByIdAndUpdate(id,req.body)
            return res.redirect('/product/list')
        }catch(error){
            console.log(error);
            
        }
    }


    async delete(req,res){
        try{
            const id=req.params.id
            const data=await Product.findByIdAndDelete(id)
            return res.redirect('/product/list')
        }catch(error){
            console.log(error);
            
        }
    }

}


module.exports=new ProductEjsController()