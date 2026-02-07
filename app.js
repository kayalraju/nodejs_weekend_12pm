
const express=require('express')


const app=express()



app.get('/',(req,res)=>{
    res.send('<h1>Home Page</h1>')
})

app.get('/about',(req,res)=>{
    res.send('<h1>about page</h1>')
})



const Port=5000


app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`)
})