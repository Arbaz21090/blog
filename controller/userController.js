const userModel = require("../model/userModel");
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');
const createUser=async(req, res)=>{
    try {
        const {username, email, password}=req.body;
        if(!username || !email || !password){
            return res.status(400).json({message:'All Fields are required'})
        }
        const existingUser=await userModel.findOne({email})
        if(existingUser){
            return res.status(409).json({
                message:"User Already Exists"
               
            })
        }
        
        const newUser=await userModel.create({username, email, password})
        
        res.status(201).json({message:'User Created Successfully', newUser})
    } catch (error) {
       return res.status(500).json({
        message:'Inernal server',
        success:false, 
        error: error.message})
    }
}
const Allusers=async(req, res)=>{
try {
    const AllUsers=await userModel.find({})
    res.status(200).json({
        userCount:AllUsers.length,
      success:true,
      message:'all Users',
      AllUsers
    })
} catch (error) {
    return res.status(500).json({message:'internal server error', error:error.message})
}
}
const logincontroller=async(req, res)=>{
    try {
        const {email, password}=req.body
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message: 'All fields are required',

            })
        }
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message:'User not found'
            })
        }
        const isMatched= await bcrypt.compare(password, user.password)
        if(!isMatched){
            return res.status(401).json({
                message:'invalid email and password'
            })
        }
        const token=await jwt.sign(
            {id:user._id, email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )
        res.status(200).json({
            message:"Login Successful",
            token,
            user:{
                id:user._id,
                email:user.email,
              
            }
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"internal sever error",
            error:error.message
        })
    }
}
module.exports={createUser, Allusers, logincontroller}

