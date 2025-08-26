import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import { response } from "express";


export const protectRoute=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;

        if(!token){
            return res.status(401).json({message:"Unauthorised-No token Provided"});
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({message:"Unauthorised - Invalid Token"});
        }

        const user=await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        req.user=user

        next();

    }
    catch(e){
        console.log("error in protect route",e.message);
        res.status(401).json({message:"Protect route error"})
    }
}