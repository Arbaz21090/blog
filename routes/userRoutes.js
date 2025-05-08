const express=require("express")
const { createUser, Allusers, logincontroller } = require("../controller/userController")

const router=express.Router()

router.post('/create-user', createUser)
router.get('/getAllUsers', Allusers)
router.post('/login', logincontroller)

module.exports= router