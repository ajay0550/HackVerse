import User from "../models/User.js";


export const signup = async (req, res) => {
    try{
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