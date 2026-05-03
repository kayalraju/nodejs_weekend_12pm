const User=require('../models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


class AuthEjsController{

    async authcheck(req,res,next){
         try {
            if (req.user) {
                next()
            } else {
                res.redirect('/login/view');
            }
        } catch (err) {
            console.log(err)
        }
    }
   
    async register(req,res){
        return res.render('register')
    }

    async registerCreate(req,res){

         try {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
            })
            const result = await user.save()
            console.log('data', result);

            if (result) {

                console.log('register successfully');

                res.redirect('/login/view')
            } else {
                console.log('register failed');

                res.redirect('/register/view')
            }


        } catch (err) {
            console.log(err)
        }

    }

     async login(req,res){
        return res.render('login')
    }

    async loginCreate(req,res){

         try {
            // Get user input
            const { email, password } = req.body;

            // Validate user input
            if (!(email && password)) {
                console.log('All input is required');
                res.redirect('/login/view');
            }
            // Validate if user exist in our database
            const user = await User.findOne({ email });

            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const tokendata = jwt.sign(
                    {
                        id: user._id,
                        name: user?.name,
                        email: user?.email,
                    },
                    process.env.JWT_SECRECT,
                    {
                        expiresIn: "2h",
                    }
                )
                if (tokendata) {
                    res.cookie('Token', tokendata)
                    res.redirect('/user/dashboard');
                } else {
                    console.log('login failed');
                }
            }
            console.log('login failed');
            res.redirect('/login/view');
        } catch (err) {
            console.log(err)
        }

    }


    async dashboard(req,res){
        return res.render('dashboard',{
            user:req.user
        })
    }


    async logout(req,res){
        res.clearCookie('Token')
        res.redirect('/login/view')
    }
}



module.exports=new AuthEjsController()