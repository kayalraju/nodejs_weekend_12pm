require('dotenv').config()
const express=require('express')
const ejs=require('ejs')
const path=require('path')
const dbConnection=require('./app/config/dbcon')
const cors=require('cors')
const Limit=require('./app/utils/RateLimit')
const cookieParser=require('cookie-parser')
const session=require('express-session')

const app=express()
dbConnection()

app.set('view engine','ejs')
app.set('views','views')

//cookie parser
app.use(cookieParser())
//setup session
app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
     }
  }))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//create a static folder
app.use(express.static('public'))
//static folder using path module
 app.use(express.static(path.join(__dirname,'public'))) 
 app.use('uploads',express.static(path.join(__dirname,'/uploads')))
    app.use('/uploads',express.static('uploads'));
 //corse middleware
 app.use(cors())

 app.use(Limit)
 const AuthEjsRoute=require('./app/router/authejsRoute')
 app.use(AuthEjsRoute)
 const productRoute=require('./app/router/ProductapiRoute')
 app.use('/api',productRoute)

const HomeRoute=require('./app/router/homeRoute')
app.use(HomeRoute)

const userAuthRoute=require('./app/router/userAuthRoute')
app.use('/api',userAuthRoute)


const Port=3007

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`)
})





