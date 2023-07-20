const express = require('express');
const usercontroller =require('../controllers/userController')
const router = new express.Router()
const middleware= require("../middlewares/authMiddleware")

// register funciton
router.post("/register",usercontroller.register)

// login function
router.post("/login",usercontroller.login)

// get balance
router.get("/get-balance/:acno",middleware.jwtMIddleware,usercontroller.getBalance)

// fund transfer
router.post("/fund-transfer",middleware.jwtMIddleware,usercontroller.fundTransfer)

// transaction history
router.get("/get-transactions",middleware.jwtMIddleware,usercontroller.getTransactions)


//delete acc

router.delete("/delete-account",middleware.jwtMIddleware,usercontroller.deleteAcno)

// exporting router
module.exports=router