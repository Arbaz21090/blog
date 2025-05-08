const mongoose=require('mongoose');

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Title is required"]
    },
    description:{
        type:String,
        required:[true, "description is required"]
    },
    imageUrl:{
        type:String,
        required:[true, 'image url is required']

    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:[true, "user id is required"]
    }

})
const blogModel=mongoose.model("blog", blogSchema)
module.exports=blogModel