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
        type: String,
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
    passwordResetExpires: Date,
    

    // contact informartion
    phone: {
        type:String,
        validate:{ 
            validator: function(v){
                return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(v);

            },
            message: props=>`${props.value} is not a valid phone number`,
        },
        trim: true,
    },


    address:[{
        ward: String,
        constituency: String,
        county:String,
        country:{
            type: String,
            default: 'Kenya',
        },
        isDefault: {
            type: Boolean,
            default: false
        }
    }],

    // specific field in the ecommerce

    wishList:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],

    cart:{
        items:[{
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
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
                dimension: String,
            }
        }],
        totalPrice: {
            type: Number,
            default: 0,
        }
    },


    orderHistory:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],

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
        type: String,
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

//password encryption middleware
userSchema.pre('save', async function (next){
    if (!this.isModified('password')) return  next();
    this.password = await bcrypt.hash(this.password, 12)
    next();
});

// upadte password when it is changed or modified

userSchema.pre('save', function (next){
    if(!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now()-1000;
    next();
});

//instance method to check the password

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
}

//instance for password reset token 
 userSchema.methods.createPasswordResetToken = function (){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires= Date.now()+ 10*60*1000; // expires after 10 minutes
    return resetToken;
 }


 const User = mongoose.model('User', userSchema);

 module.exports = User;
