const jwt = require('jsonwebtoken');

exports.appMiddleware = (req, res, next) => {
    console.log("inside middle ware ");
    next()
}

exports.jwtMIddleware = (req, res, next) => {
    // console.log("yo I am in jwtMware");

    const token = req.headers["access-token"]

    try {

        const {loginAcno} = jwt.verify(token, "enKey5464")
        req.loginAcno = loginAcno
        next()


    } catch {
        res.status(406).json("please login bro!")

    }


}