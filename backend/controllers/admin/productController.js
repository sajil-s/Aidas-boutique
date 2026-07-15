import Product from "../../models/Product.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProduct=async(req,res)=>{
    try{
        const product=await Product.findById(
            req.params.id
        );
        if(!product){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        product.title=req.body.title ?? product.title;
        product.description=req.body.description ?? product.description;
        product.category=req.body.category ?? product.category;
        product.craft=req.body.craft ?? product.craft;
        product.basePrice =req.body.basePrice ??product.basePrice;
        product.discountPrice =req.body.discountPrice ??product.discountPrice;
        product.images =req.body.images ?? product.images;
        product.variants =req.body.variants ??product.variants;
        product.isFeatured =req.body.isFeatured ??product.isFeatured;
        product.isActive=req.body.isActive??product.isActive;
const updatedProduct=await product.save();
res.status(200).json(updatedProduct)

    }catch(error){
        res.status(500).json({
            message:error.message,
        })
    }
}

const createProduct=async (req,res)=>{
    try{
        const{
            title,
            description,
            category,
            craft,
            basePrice,
            discountPrice,
            images,
            variants,
            isFeatured
        }=req.body;

        if(
            !title ||
      !description ||
      !category ||
      !basePrice ||
      !images ||
      !variants
        ){
            return res.status(400).json({
                message:"Required field missing"
            })
        }

        const product=await Product.create({
            title,
        description,
        category,
        craft,
        basePrice,
        discountPrice,
        images,
        variants,
        isFeatured,
        });

        res.status(201).json(product)
    }catch(error){
        res.status(500).json({
          message:error.message  
        })
    }
}

export { getAllProducts,updateProduct,createProduct };