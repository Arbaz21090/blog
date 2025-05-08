const express=require('express')

const { createBlogCtrl,userBlogCtrl, getAllBlogCtrl, updateBlogCtrl, deleteBlogCtrl, getDetailBlogById} = require('../controller/blogController')
const router=express.Router()


router.post('/create-blog', createBlogCtrl)

router.get('/allblogs', getAllBlogCtrl)

router.put("/update-blog/:id", updateBlogCtrl)
router.delete('/delete-blog/:id', deleteBlogCtrl)
router.get('/getDetailBlog/:id', getDetailBlogById)
router.get("/user-blog/:id", userBlogCtrl)

module.exports=router