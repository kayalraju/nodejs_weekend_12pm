
const { array } = require('joi')
const mongoose=require('mongoose')
const Schema= mongoose.Schema



const InventrySchema=new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: String,
        
    },
    category: [{
        type: String,
        required: true
    }]
},{
    timestamps: true,
    versionKey: false
})

//single filed indexing
InventrySchema.index({name:'text'})

const InventryModel=mongoose.model('pro',InventrySchema)

module.exports=InventryModel