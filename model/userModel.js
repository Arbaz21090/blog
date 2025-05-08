const mongoose=require("mongoose")
const bcrypt = require('bcrypt');
const userSchema=new mongoose.Schema({
username:{
    type:String,
    required:[true,"Name is required"]
},
email:{
    type:String,
    required:[true, "Email is required"]
},
password:{
    type:String,
    required:[true,"Password is required"]
    
}, 
blogs:
    [
    {
        type:mongoose.Types.ObjectId,
        ref:'blog'
    }
]

}, {timestamps:true})
// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if password is new/modified
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
const userModel= mongoose.model("user", userSchema)
module.exports = userModel;