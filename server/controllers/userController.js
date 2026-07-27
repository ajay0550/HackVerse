import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const signup = async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const user = await User.create(req.body);
        res.status(201).json({
            message: "User created successfully",
            user
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Somthing went wrong"
        });
    } 
};

export const login = async (req,res) =>{
    try{
        const user = await User.findOne({
            email : req.body.email
        });
        if(!user) {
            return res.status(400).json({
                message: "Email not Found"
            });
        }
        const typedpassword = req.body.password;
        const isMatch = await bcrypt.compare(typedpassword,user.password);
        if(isMatch){
            const token = jwt.sign(
                {
                    id: user._id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            )


            return res.status(200).json({
                message: "User Logged in",
                token
            });
        }

        return res.status(400).json({
            message : "Invalid credentials"
        });
        
    } 
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong!"
        });
    }
}