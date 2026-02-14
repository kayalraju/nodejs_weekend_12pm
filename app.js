const express=require('express')
const ejs=require('ejs')

const app=express()


app.set('view engine','ejs')
app.set('views','views')

const HomeRoute=require('./app/router/homeRoute')
app.use(HomeRoute)


const Port=5000

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`)
})