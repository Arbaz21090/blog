const blogModel = require("../model/blogModel")
const userModel = require("../model/userModel")
const mongoose= require('mongoose')
const createBlogCtrl = async (req, res) => {
  try {
    const { title, description, imageUrl, user } = req.body;

    if (!title || !description || !imageUrl || !user) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Unable to find user",
      });
    }

    const newBlog = new blogModel({ title, description, imageUrl, user });

    // const session = await mongoose.startSession();
    // session.startTransaction();
    // await newBlog.save({ session });
    // existingUser.blog.push(newBlog);
    // await existingUser.save({ session });
    // await session.commitTransaction();
    await newBlog.save();
    existingUser.blogs.push(newBlog);
    await existingUser.save();
    
    return res.status(201).json({
      success: true,
      message: "Blog Created Successfully",
      blogs: newBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateBlogCtrl = async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await blogModel.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found',
        });
      }
  
      return res.status(200).json({
        success: true,
        message: 'Blog updated successfully',
        blog,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  };
  

  const deleteBlogCtrl = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedBlog = await blogModel.findByIdAndDelete(id).populate('user');
  
      if (!deletedBlog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found",
        });
      }
  
      // Remove blog ID from user's blogs array
      const user = await userModel.findById(deletedBlog.user._id);
      if (user) {
        user.blogs.pull(deletedBlog._id);
        await user.save();
      }
  
      return res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
        blog: deletedBlog,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };
  
  
const getAllBlogCtrl=async(req, res)=>{
    try {
       const allbogs=await blogModel.find({}).populate('user')
       return res.status(200).json({
        blogCount:allbogs.length,
        allbogs
       }) 
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"internal server error",
            error:error.message
        })
    }
}
const getDetailBlogById=async(req, res)=>{
  try{
     const {id}=req.params
     const detailBlog=await blogModel.findById(id)
     if(!detailBlog){
        return res.status(404).json({
            success:false,
            message:'Blog not found',
        })
     }
     return res.status(200).json({
        success:true,
        message:"Blog",
        detailBlog
     })
  }catch(error){
    return res.status(500).json({
        success:false,
        message:"internal server error",
        error
    })
  }
}
const userBlogCtrl=async(req, res)=>{
  try {
    const {id}=req.params;
    const userblog=await userModel.findById(id).populate('blogs')
    if(!userblog){
      return res.status(404).json({
          success:false,
          message:'Blog not found with this id',
      })
   }
return res.status(200).json({
  success:true,
  message:'user Blogs',
  userblog
})
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:'internal server error',
      error:error.message
    })
  }
}
module.exports={createBlogCtrl,userBlogCtrl, getAllBlogCtrl, updateBlogCtrl, deleteBlogCtrl,getDetailBlogById}
