
import { getAuth } from "firebase-admin/auth"
import { app } from "../config/firebase.js"
import User from "../models/user.model.js"
import crypto from "crypto";
import {createConnection} from "mongoose"
import redis from "../../../shared/redis/redis.js"



export const login = async (req,res)=>{
     console.log("Login called");
    try{
        const {token} = req.body;
         console.log("Token received");

        const decoded = await getAuth(app).verifyIdToken(token)
        console.log(decoded);

        let user = await User.findOne({
            firebaseUid:decoded.uid
        })
         console.log("User found", user);

        if(!user){
            user = await User.create({
                firebaseUid:decoded.uid,
                name:decoded.name,
                email:decoded.email,
                avatar: decoded.picture
            })
        }

        const sessionId = crypto.randomUUID()
        // redis--------
        await redis.set(`session-${sessionId}`,JSON.stringify({
            userId:user._id,
            name:user.name,
            email:user.email,
            avatar:user.avatar
        }), "EX",7*24*60*60)
        
        res.cookie("session", sessionId, {
            httpOnly:true,
            secure:false, 
            sameSite:"strict",
            maxAge:7*24*60*60*1000 //7days
        })
        
          console.log("Sending response");

        return res.status(200).json(user)

    }
    catch(error){
        return res.status(500).json({message:`login error - ${error}`})
    }
}


export const logOut = async (req,res)=>{
    try{
        const sessionId = req.cookies?.session
        await redis.del(`session-${sessionId}`) // deleted from redis

        res.clearCookie("session")
        return res.status(200).json({message:"Logged out successfully"})
    
    }catch(error){
        return res.status(500).json({message:`logout error - ${error}`})
    }
}