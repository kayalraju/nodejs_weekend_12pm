require('dotenv').config()
const mongoose=require('mongoose');
const logger=require('../utils/logger')


const DBCon=async()=>{
    try {
       const connection= await mongoose.connect(process.env.MONGO_URL)
       if(connection){
           logger.info('Database connected')
       }else{
        logger.error('Database not connected')
       } 
        
    } catch (error) {
        logger.error(error.message)
    }
}
module.exports=DBCon