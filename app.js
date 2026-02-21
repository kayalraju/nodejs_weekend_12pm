require('dotenv').config()
const express=require('express')
const ejs=require('ejs')
const path=require('path')
const dbConnection=require('./app/config/dbcon')

const app=express()
dbConnection()

app.set('view engine','ejs')
app.set('views','views')
app.use(express.json())
//create a static folder
app.use(express.static('public'))
//static folder using path module
 app.use(express.static(path.join(__dirname,'public'))) 
 
 const productRoute=require('./app/router/ProductapiRoute')
 app.use('/api',productRoute)

const HomeRoute=require('./app/router/homeRoute')
app.use(HomeRoute)


const Port=5000

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`)
})