import mongoose from "mongoose";
// import { stripLow } from "validator";

const cartItemSchema=new mongoose.Schema(
    {
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        title:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
         selectedColor: {
        type: String,
        required: true,
      },

      selectedSize: {
        type: String,
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },

      price: {
        type: Number,
        required: true,
      },

    },
    {
        _id:true
    }
)


const userSchema=new mongoose.Schema(
    {
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    wishlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ],  
    cart:[cartItemSchema]
},
{timestamps:true}
)

const User =mongoose.model("User",userSchema);

export default User;