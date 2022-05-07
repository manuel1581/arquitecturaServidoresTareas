const User = require("../models/user_lecture.model");


/*
Creamos  un modulo para cada ruta.
*/

module.exports.list = (req, res, next) => {
    User.find()
    .then((users) => {
        res.json(users);
    })
    .catch(next);
};

module.exports.detal = (req, res, next) => {
    //el id debe ser algo asi como 5eb78994dbb89024f04a2507
    //ref: https://stackoverflow.com/questions/61705548/casterror-cast-to-objectid-failed-for-value
    User.findById(req.params.id) //se mando en conjunto con la url como parametro
    .then((user) => {
        if(user) {
            res.json(user);
        }
        else {
            res.status(404).json({"message": "User not found"}) 
        }
    })
    .catch(next);
};

module.exports.create = (req, res, next) => {

    const data = ({ email, name, bio, avatar, password} = req.body);

    User.create(data)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch(next);

};

module.exports.update = (req, res, next) => {

    const data = ({email, name, bio, avatar, password } = req.body);

    User.findByIdAndUpdate(req.params.id, data, {new:true}) //new true si se quiere modificar al regresar al momento
        .then((user) => {

            if(user) {
                res.json(user);
            }
            else{
                res.status(404).json({"message": "User not found"}) 
            }

        })
        .catch(next);

};

module.exports.delete = (req, res, next) => {


    User.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(204).send(); //solo manda las cabeceras
    })
    .catch(next);


};