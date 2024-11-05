import { User } from "../utils/userModel.js";
import bcyrpt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async(req,res)=>{
    try {
        const {fullname,email,phoneNumber,password,role} = req.body; 
        if(!fullname|| !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        };

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:"User already existed with this email",
                success : false
            });
        };
        const hashedPassword = await bcyrpt.hash(password,10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
        });

        return res.status(201).json({
            message:"Account created Sucessfully",
            success:true,
       })
    } catch (error) {
        console.log(error);
    }
}

export const login= async(req,res)=>{
    try {
        const{fullname,email,role} = req.body;
        if(!fullname || !email || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false,
            });
        };

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false,
            })
        }
        const isPasswordMatch = await bcyrpt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false,
            })
        }
        if(role!==user.role){
            return res.status(400).json({
                message:"Doesnt exist with current role",
                success:false,
           })
       };

       const tokenData = {
        userId: user._id
       } 

       const token = await jwt.sign(tokenData, process.env.SECRET_KEY,{expiresIn:'1d'});

       user = {
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        phoneNumber:user.phoneNumber,
        role:user.role,
        profile:user.profile,
       }

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:'strict'}).json({
        message:`Welcome Back ${user.fullname}`,
        success:true,
       }) 
    }
    catch (error) {
        console.log(error);
    }
}

export const logout = async(req,res) => {
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged Out Sucessfully",
            success:true,
        })
    } catch (error) {
        
    }
}

export const updateProfile = async(req,res) =>{
    try {
        const {fullname,email,phoneNumber,bio,skills}= req.body;
        const file = req.file;
        if(!fullname|| !email|| !phoneNumber|| !bio|| !skills){
            return res.status(400).json({
                message:"Something is Missing",
                success:false
            });
        };
        const skillsArray = skills.split(",");
        const userId = req.id;
        let user = await User.findById(userId);
        
        if(!user){
            return res.status(400).json({
                message:"User not found",
                success:false
            });
        }
        
        user.fullname = fullname,
        user.email = email,
        user.phoneNumber = phoneNumber,
        user.profile.bio = bio,
        user.profile.skills = skillsArray

        await user.save();

        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile,
           }

        return res.status(200).json({
            message:"Profile Updated sucessfully",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}