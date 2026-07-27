import User from "../models/User.js";
import bcrypt from "bcrypt";


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
    
}