const User=require('../models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const sendEMail = require('../utils/sendMail')
const OTPMOdel=require('../models/otp')



class UserAuthController{


    async Register(req,res){

        try{
            const {name,email,password}=req.body

            if(!name || !email || !password){
                return res.status(400).json({
                    status:false,
                    message:'All fields are required'
                })
            }

            const existUser= await User.findOne({email})  
            if(existUser){
                return res.status(400).json({
                    status:false,
                    message:'User already exist'
                })
            }
              //hash password
              const salt=await bcrypt.genSalt(10)
              const hashPassword=await bcrypt.hash(password,salt)
              const user=await User.create({
                  name,
                  email,
                  password:hashPassword
              })
              sendEMail(req,user)
              return res.status(200).json({
                  status:true,
                  message:'User created successfully and sent OTP for verification',
                  data:user
              })

        }catch(error){
            return res.status(500).json({
                status:false,
                message:error.message
            })

        }

    }


    async verifyEmail(req,res){
        try {
            const { email, otp } = req.body;
            // Check if all required fields are provided
            if (!email || !otp) {
                return res.status(400).json({ status: false, message: "All fields are required" });
            }
            const existingUser = await User.findOne({ email });

            // Check if email doesn't exists
            if (!existingUser) {
                return res.status(404).json({ status: "failed", message: "Email doesn't exists" });
            }

            // Check if email is already verified
            if (existingUser.isVerified) {
                return res.status(400).json({ status: false, message: "Email is already verified" });
            }
            // Check if there is a matching email verification OTP
            const emailVerification = await OTPMOdel.findOne({ userId: existingUser._id, otp });
            if (!emailVerification) {
                if (!existingUser.is_verified) {
                    // console.log(existingUser);
                    await sendEMail(req, existingUser);
                    return res.status(400).json({ status: false, message: "Invalid OTP, new OTP sent to your email" });
                }
                return res.status(400).json({ status: false, message: "Invalid OTP" });
            }
            // Check if OTP is expired
            const currentTime = new Date();
            // 15 * 60 * 1000 calculates the expiration period in milliseconds(15 minutes).
            const expirationTime = new Date(emailVerification.createdAt.getTime() + 5 * 60 * 1000);
            if (currentTime > expirationTime) {
                // OTP expired, send new OTP
                await sendEmail(req, existingUser);
                return res.status(400).json({ status: "failed", message: "OTP expired, new OTP sent to your email" });
            }
            // OTP is valid and not expired, mark email as verified
            existingUser.is_verified = true;
            await existingUser.save();

            // Delete email verification document
            await OTPMOdel.deleteMany({ userId: existingUser._id });
            return res.status(200).json({ status: true, message: "Email verified successfully" });


        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: "Unable to verify email, please try again later" });
        }
    }

    async login(req,res){
        try{
            const {email,password}=req.body

            if(!email || !password){
                return res.status(400).json({
                    status:false,
                    message:'All fields are required'
                })
            }

            const user=await User.findOne({email})
            console.log('user',user.name);
            
            if(!user){
                return res.status(400).json({
                    status:false,
                    message:'User does not exist'
                })
            }
            if(user.isVerified){
                return res.status(400).json({
                    status:false,
                    message:'User is not verified'
                })
            }
            const isMatch=await bcrypt.compare(password,user.password)
            if(!isMatch){
                return res.status(400).json({
                    status:false,
                    message:'Password does not match'
                })
            }
            

            //token
            const token= jwt.sign({
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            },process.env.JWT_SECRECT ||'scecret',{expiresIn:'1h'})

            if(!token){
                return res.status(400).json({
                    status:false,
                    message:'Token not created'
                })
            }
            return res.status(200).json({
                status:true,
                message:'User logged in successfully',
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                },
                token:token
            })
          
        }catch(error){
            return res.status(500).json({
                status:false,
                message:error.message
            })
        }

    }

    async dashboard(req,res){
        try{
            return res.status(200).json({
                status:true,
                message:'welcome to User dashboard',
                user:req.user
            })
        }catch(error){
            return res.status(500).json({
                status:false,
                message:error.message,
                
            })
        }
    }
}


module.exports= new UserAuthController()