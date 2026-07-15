import Product from "../models/Product.js";
import mongoose from "mongoose";



const getProducts=async(req,res)=>{
    try{
        const{
            search,category,craft,color,
            size,minPrice,maxPrice,featured,sort
        }=req.query;
        const query={
            isActive:true
        }
        if(craft){
            query.craft=craft
        }
        if(color){
            query["variants.color"]=color;
        }
            if (size) {
      query["variants.size"] =
        size;
    }

    // featured
    if (featured === "true") {
      query.isFeatured = true;
    }

    // price filter
    if (
      minPrice ||
      maxPrice
    ) {
      query.discountPrice = {};

      if (minPrice) {
        query.discountPrice.$gte =
          Number(minPrice);
      }

      if (maxPrice) {
        query.discountPrice.$lte =
          Number(maxPrice);
      }
    }

    /////////////

    if (search) {
  query.title = {
    $regex: search,
    $options: "i",
  };
}

if (category) {
  query.category = category;
}
    //////////////////


    let productsQuery =Product.find(query);
    productsQuery = productsQuery.sort({
  createdAt: -1,
});
    //   

    // sorting
    if (sort === "lowToHigh") {
      productsQuery =
        productsQuery.sort({
          discountPrice: 1,
        });
    }

    if (sort === "highToLow") {
      productsQuery =
        productsQuery.sort({
          discountPrice: -1,
        });
    }
    const products= await productsQuery;

        res.status(200).json(products);

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
    
}

const getProductById= async(req,res)=>{
    try{
   
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        const product=await Product.findById(
            req.params.id
        )
        if(!product || !product.isActive){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({
            message:error.message    
            })
    }
}

const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category", {
      isActive: true,
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};






export { getProductById,getProducts,getCategories
    
 }