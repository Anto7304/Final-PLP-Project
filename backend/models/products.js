const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    title:{ 
        type: String,
        required:true,
        trim: true,
    },

     img:{
        type:String,
        required: true
    },

    description: {
        type:String,
        required: true,
        trim: true
    },

    inStock:String,
   
    numberInStock:{
        type:String,
        required: true,
    },

    price: {
        type:String,
        min:0,
        required: true
        },
    
    

},{timestamps: true})

const Items = mongoose.model("Item", itemSchema)

module.exports = Items;