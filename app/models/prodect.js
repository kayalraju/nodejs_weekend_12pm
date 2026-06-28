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
    category: { type: mongoose.Schema.Types.ObjectId,
         ref: 'category', 
         required: true
         },
},{
    timestamps: true,
    versionKey: false
    
})

module.exports= mongoose.model('prodect',ProductSchema)