const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator= require('validator');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },

    lastName:{
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    
    // authentication

    email:{
        type: stringify,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail]
    },

    password:{
        type:String,
        required: true,
        minlength: 8,
        select: false,
    },

    passwordChangedAt:Date,
    passwordResetToken: String,
    passwordResetTokenAt: Date,
    

    // contact informartion
    phone: {
        type:String,
        validate: function(v){return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(v);},
            message: props=>`${props.value}is not a valid phone number`,
            trim:true,
    },

    address:[{
        ward: String,
        contituency: true,
        conty:String,
        country:{
            type: String,
            default: Kenya,
        },
        isDefault: {
            type: Boolean,
            default: false
        }
    }],

    // specific field in the ecommerce

    wishList:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    }],

    cart:{
        items:[{
            productId:{
                type: mongoose.Schema.ObjectId,
                ref: 'Products',
                required: true
            },

            quantity:{
                type:Number,
                required: true,
                min:1,
                default:1,
            },

            configuration:{
                color: String,
                material: String,
                dimension: string
            }
        }],
        totalPrice: {
            type: Number,
            default: 0,
        }
    },


    orderHistory: {
        type: mongoose.Schema.ObjectId,
        ref: 'Order'
    },

    // Account status

    isVerified:{
        type:Boolean,
        default:  false,
    },

    isActive: {
        type: Boolean,
        default: true,
        select: false,
    },

    role:{
        type: string,
        enum: ['user', 'designer','admin'],
        default: 'user'
    },

    // metadata

    lastLogin: Date,
    loginCount: {
        type:Number,
        default: 0
    }
    
},{
        timestamps: true,
        toJSON:{virtual: true},
        toObject:{virtual: true}
    }
)