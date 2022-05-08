const jwt = require("jsonwebtoken");


module.exports.checkAuth = (req, res, next) => {


    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1]; //esto es el token desde el header.

    try{
        var decoded = jwt.verify(token, process.env.SUPER_SECRET)

        console.log(`user ${decoded.sub}`)
        next();

    } catch(err){
        res.status(401).json({message: "unauthorized"})
    }

};

// Authorization: bearer <TOKEN>


