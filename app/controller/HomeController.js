



class HomeController{

    homepage(req,res){
        res.send('<h1> welcome to Home Page</h1>')
    }
    aboutpage(req,res){
        res.send('<h1> welcome to about Page</h1>')
    }

}




module.exports= new HomeController()