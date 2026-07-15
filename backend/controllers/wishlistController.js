import User from "../models/User.js";
import Product from "../models/Product.js";

const toggleWhishlist= async(req,res)=>{
    try{
  const {productId}=req.params;
 const product= await Product.findById(
    productId
 );

 if (!product || !product.isActive ) {
        return res.status(404).json({
          message:
            "Product not found",
        });
      }
      const user =
        await User.findById(
          req.user._id
        );
        const exists =
        user.wishlist.includes(
          productId
        );
        
     
    if (exists) {
        user.wishlist =
          user.wishlist.filter(
            (id) =>
              id.toString() !==
              productId
          );
        await user.save();
        return res.status(200).json({
          message:
            "Removed from wishlist",
        });
        }
        user.wishlist.push(
        productId
      );
      await user.save();
      res.status(200).json({
        message:
          "Added to wishlist",
      });

    }catch(error)
    {
           res.status(500).json({
        message:
          error.message,
      });
    }
}

const getWishlist=async(req,res)=>{
    try{
        const user= await User.findById(
            req.user._id
        ).populate(
            "wishlist"
        );
        res.status(200).json(user.wishlist)
    }catch(error){
         res.status(500).json({
        message:
          error.message,
      });
    }
}



export {toggleWhishlist,getWishlist}