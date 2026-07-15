import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect= async (req,res,next)=>{
    try{
        const token=req.cookies.jwt;

        if(!token){
            return res.status(401).json({
                message:"Not autharized,no token"
            })
        }
        const decoded=jwt.verify(
            token,process.env.JWT_SECRET
        )
        req.user=await User.findById(
            decoded.userId
        ).select("-password")
        next();
    }catch(error){
        return res.status(401).json({
            message:"no autharized ,token failed"
        })
    }
}

const admin=async(req,res,next)=>{
   if( req.user&&req.user.role==="admin"){
    next()
   }else{
    return res.status(403).json({
        message:"Admin access only"
    })
   }
}

export { protect,admin }