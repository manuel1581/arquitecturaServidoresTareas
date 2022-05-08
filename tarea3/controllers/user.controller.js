const User = require("../models/user.model");
const createError = require("http-errors")
const jwt = require("jsonwebtoken");


//create user
module.exports.create = (req, res, next) => {

    const data = ({ name, email, password, bio} = req.body);

    //console.log(data)
    //console.log(data["title"])
    

    User.create(data)
        .then((post) => {
            res.status(201).json(post);
        })
        .catch(next);


};


//create login

module.exports.login = (req, res, next) => {


    const data = ({ name, email, password, bio} = req.body);

    User.findOne({email: req.body.email})
        .then((user)=> {

            if (user){
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
