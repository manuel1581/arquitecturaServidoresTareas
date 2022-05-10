const User = require("../models/user.model");
const createError = require("http-errors")
const jwt = require("jsonwebtoken");
const {sendValidationEmail} = require("../config/nodemailer.config")

//create user
module.exports.create = (req, res, next) => {

    const data = ({ name, email, password, bio} = req.body);

    //console.log(data)
    //console.log(data["title"])
    

    User.create(data)
        .then((user) => {
            sendValidationEmail(user);
            res.status(201).json(user);
        })
        .catch(next);


};


//create login

module.exports.login = (req, res, next) => {


    const data = ({ name, email, password, bio} = req.body);

    User.findOne({email: req.body.email})
        .then((user)=> {

            if (user && user.active){ //solo podran hacer login los usuarios activos.
                user.checkPassword(req.body.password)
                .then((match)=>{
                    if (match){

                        const token = jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            sub: user.id
                          }, 
                          process.env.SUPER_SECRET //ESTO CAMBIARA DE SERVIDOR EN SERVIDOR
                          );

                        res.json({access_token: token});
                          

                    }
                    else{
                        next(createError(401, "invalid credentials")) //401 is unauthorized
                    }

                })
                .catch(next)
            }
            else{

                next(createError(401, "invalid credentials")) //401 is unauthorized

            }

        })
        .catch(next);


};



module.exports.validate = (req, res, next) => {

    User.findByIdAndUpdate(req.params.id, { active: true})
        .then((user)=> {
            res.json({message: "activated"})
        })
        .catch(next);


}