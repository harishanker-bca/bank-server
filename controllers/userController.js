// imports; in v 5 we use req but v 6 we use import 
const users = require('../model/userSchema');
const jwt = require('jsonwebtoken');



// register logic
exports.register = async (req, res) => {
    console.log("inside register funtion");
    // res.status(200).json("Register request recived")

    const { username, acno, password } = req.body

    try {
        const result = await users.findOne({ acno })
        if (result) {
            res.status(406).json("Account already exist.Please log in!!!")
        }
        else {
            const newUser = new users({
                username, acno, password, balance: 5000, transctions: []
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    } catch (error) {
        res.status(401).json(error)
    }

}

// login logic
exports.login = async (req, res) => {
    const { acno, password } = req.body
    try {
        const bankUser = await users.findOne({ acno, password })

        if (bankUser) {
            const token = jwt.sign({ loginAcno: acno }, "enKey5464")
            res.status(200).json({
                loginUser: bankUser,
                token
            })
        }
        else {
            res.status(404).json("invalid acc/pass")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// get balance logic
exports.getBalance = async (req, res) => {
    const { acno } = req.params
    // res.status(200).json("yep")
    try {
        const result = await users.findOne({ acno })
        if (result) {
            res.status(200).json(result.balance)
        } else {
            res.status(404).json("acc not found!! I DONT KNOW why")
        }

    } catch (error) {

        res.status(401).json(error)
    }

}

// fund transfer logic
exports.fundTransfer = async (req, res) => {

    const { loginAcno } = req
    const { creditAcno, amount } = req.body
    let amt = Number(amount)

    try {
        const debitUser = await users.findOne({ acno: loginAcno })

        const creditUser = await users.findOne({ acno: creditAcno })

        if (loginAcno == creditAcno) {
            res.status(406).json("operation denied!!")
        }
        else {
            if (creditUser) {
                if (debitUser.balance >= amt) {

                    debitUser.balance -= amt
                    debitUser.transaction.push({
                        transaction_type: "DEBIT", amount: amt, toAcno: creditAcno, fromAcno: loginAcno
                    })
                    await debitUser.save()


                    creditUser.balance += amt
                    creditUser.transaction.push({
                        transaction_type: "CREDIT", amount: amt, toAcno: creditAcno, fromAcno: loginAcno
                    })
                    await creditUser.save()



                    res.status(200).json("transaction succuessfull")
                }
                else {
                    res.status(406).json("Transaction failed...Insufficient Balance!!!")
                }

            } else {
                res.status(404).json("Transaction failed,acc Not found!!")
            }
        }

    } catch (error) {
        res.status(401).json("somthing went wrong!!")
    }

}


// get transation hystory
exports.getTransactions = async (req, res) => {
    const { loginAcno } = req
    try {
        const userDeatils = await users.findOne({ acno: loginAcno })
        if (userDeatils) {
            const { transaction } = userDeatils
            res.status(200).json(transaction)
        }
        else {
            res.status(404).json("Invalid accout details!!!")
        }
    }
    catch (error) {
        res.status(401).json("somthing went wrong!!")
    }
}


// delete acc
exports.deleteAcno = async (req, res) => {
    const { loginAcno } = req
    try {
        await users.deleteOne({ acno: loginAcno })
        res.status(200).json("Account removed successfully!!!!")
    } catch (error) {
        res.status(401).json(error)
    }
}