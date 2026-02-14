const { name } = require("ejs")




class HomeController{

    homepage(req,res){
       res.render('index',{
        title:'Home Page'
       })
    }
    aboutpage(req,res){
       res.render('about',{
        title:'About Page'
       })
    }

    product(req,res){

        const prod={
            name:'Laptop',
            price:50000
        }
        res.render('product',{
            title:'Product Page',
            product:prod
        })

    }

}




module.exports= new HomeController()