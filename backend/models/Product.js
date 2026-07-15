
import mongoose from "mongoose";


const variantSchema=new mongoose.Schema(
    {
        color:{
            type:String,
            required:true,
            trim:true
        },
        size:{
            type:String,
            required:true,
            enum:["XS","S","M","L","XL","XXL"]
        },
        stock:{
            type:Number,
            required:true,
            min:0
        },
        sku:{
            type:String,
            required:true,
            unique:true
        }
    },
    {_id:false}
)

const productSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true,
            trim:true
        },
        craft:{
            type:String,
            trim:true
        },
        basePrice:{
            type:Number,
            required:true,
            min:0
        },
        discountPrice:{
             type:Number,
             default:null
        },
        images:[
            {
                type:String,
                required:true
            }
        ],
        variants:[variantSchema],
        isFeatured:{
            type:Boolean,
            default:false
        },
        isActive:{
            type:Boolean,
        
            default:true
        }
    },
    {timestamps:true}

);
const Product=mongoose.model(
    "Product",productSchema
)


export default Product;