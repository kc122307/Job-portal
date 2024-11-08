import { User } from "../models/userModel.js";
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

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcyrpt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
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
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.id;
        
        // Retrieve user
        let user = await User.findById(userId);
        
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        // Check if there are any updates to make
        const updates = {};
        if (fullname) updates.fullname = fullname;
        if (email) updates.email = email;
        if (phoneNumber) updates.phoneNumber = phoneNumber;
        if (bio) updates.profile.bio = bio;
        if (skills) updates.profile.skills = skills.split(",");

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "No changes detected",
                success: false
            });
        }

        // Apply updates
        Object.assign(user, updates);
        
        // Save updated user
        await user.save();

        // Return updated user info
        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            },
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while updating the profile",
            success: false
        });
    }
};
