const jwt=require('jsonwebtoken');

const AuthCheckAdmin=async(req,res,next)=>{
    const token=req?.body?.token||req?.query?.token||req?.headers['x-access-token']||req?.headers['authorization'];
    if(!token){
        return res.status(400).json({
            status:false,
            message:'Token is required for authentication'
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_ADMIN_SECRECT ||'ADMINSECRECT');
        req.admin=decoded;
        console.log('afterlogin user', req.admin);
    }catch(err){
        return res.status(400).json({
            status:false,
            message:"invalid token"
        })
    }
    return next();
}




module.exports=AuthCheckAdmin
