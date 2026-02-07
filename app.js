
const express=require('express')

const app=express()



const HomeRoute=require('./app/router/homeRoute')
app.use(HomeRoute)

const Port=5000


app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`)
})