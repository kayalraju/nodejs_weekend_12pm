
const mongoose=require('mongoose')
const Schema= mongoose.Schema



const ProductSchema=new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: 'image.jpg'
    },
    category: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
})

//single filed indexing
ProductSchema.index({name:'text'})

const ProductModel=mongoose.model('product',ProductSchema)

module.exports=ProductModel