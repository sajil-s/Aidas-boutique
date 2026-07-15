import Product from "../models/Product.js";
import User from "../models/User.js";



const addToCart=async(req,res)=>{
    try{
        const {productId,selectedColor,selectedSize,quantity}=req.body;
        if(
             !productId ||
      !selectedColor ||
      !selectedSize
        ){
            return res.status(400).json({
                message:"MIssing required fields"
            })
        }
        const product= await Product.findById(productId)
        if(
             !product ||
      !product.isActive
        ){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        const variant=product.variants.find(
            (v)=>v.color===selectedColor && v.size===selectedSize
        );
        if(!variant){
            return res.status(400).json({
                message:"Selected variant not found"
            })
        }
       if(quantity>variant.stock){
        return res.status(400).json({
            message:"insufficiant stock"
        });
       }
       const user=await User.findById(
        req.user._id
       )

       const existingItem=user.cart.find(
        (item)=>
            item.productId.toString()===productId &&
            item.selectedColor===selectedColor &&
            item.selectedSize === selectedSize
       );
       
        if (existingItem) {
      const newQty =
        existingItem.quantity +
        quantity;

        if(newQty>variant.stock){
            return res.status(400).json({
                message:"stock limit exceeded"
            })
        }
        existingItem.quantity= newQty;
    }else{
        user.cart.push({
        productId:
          product._id,
        title:
          product.title,
        image:
          product.images[0],
        selectedColor,
        selectedSize,
        quantity,
        price:
          product.discountPrice,
      });
    }
    await user.save();
    res.status(200).json({
        message:"product added to cart",
        cart:user.cart
    })

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}



const getCart=async(req,res)=>{
    try{
        const user= await User.findById(
            req.user._id
        )
        res.status(200).json(user.cart)
    }catch(error){
       res.status(500).json({
        message:error.message
       })
    }
}



const updateCartQuantity=async(req,res)=>{
    try{
        const {quantity}=req.body;

        const user=await User.findById(
            req.user._id
        );

        const cartItem=user.cart.id(
            req.params.itemId
        )
        if(!cartItem){
            return res.status(404).json({
                message:"cart item not found"
            })
        }

     const product =
        await Product.findById(
          cartItem.productId
        );
     
     const variant =
        product.variants.find(
          (v) =>
            v.color ===
              cartItem.selectedColor &&
            v.size ===
              cartItem.selectedSize
        );

        if (!variant) {
        return res.status(400).json({
          message:
            "Variant not found",
        });
      }

      if(quantity>variant.stock){
        return res.status(400).json({
            message:"stock limit exceeded"
        })
      }
      cartItem.quantity =quantity;

      await user.save();

res.status(200).json({
    message:"cart updated successfully",
    cart:user.cart
});

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}


const removeCartItem=async(req,res)=>{
    try{
        const user= await User.findById(
            req.user._id
        );




        const cartItem =
  user.cart.find(
    (item) =>
      item._id.toString() ===
      req.params.itemId
  );
        if (!cartItem) {
        return res.status(404).json({
          message:
            "Cart item not found",
        });
      }
     
     user.cart =
  user.cart.filter(
    (item) =>
      item._id.toString() !==
      req.params.itemId
  );
      await user.save();
      res.status(200).json({
        message:"item deleted from cart",
        cart:user.cart
      })


    }catch(error){
         res.status(500).json({
        message:
          error.message,
      });
    }
}




export { addToCart, getCart, removeCartItem, updateCartQuantity };
