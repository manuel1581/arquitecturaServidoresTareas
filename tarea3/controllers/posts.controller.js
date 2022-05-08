const Post = require("../models/post.model");


/*
Creamos  un modulo para cada ruta.
*/


/*
2. GET /api/posts
- Devuelve HTTP 200 OK con el listado JSON de posts almacenados en la Base de Datos en memoria

*/
module.exports.list = (req, res, next) => {
    Post.find()
    .then((post) => {
        res.status(200).json(post);
    })
    .catch(next);
};


/*
3. GET /api/posts/<id>
- Devuelve 200 OK con detalle de un Post JSON almacenado en la Base de Datos en memoria
- Devuelve 404 si el post no existe en la Base de Datos en memoria

*/

module.exports.detal = (req, res, next) => {
    //el id debe ser algo asi como 5eb78994dbb89024f04a2507
    //ref: https://stackoverflow.com/questions/61705548/casterror-cast-to-objectid-failed-for-value
    Post.findById(req.params.id) //se mando en conjunto con la url como parametro
    .then((post) => {
        if(post) {
            res.status(200).json(post);
        }
        else {
            res.status(404).json({"message": "Post not found"}) 
        }
    })
    .catch(next);
};


/*
1. POST /api/posts
- Recibe body JSON con los campos title, text y author.
- Devuelve HTTP 201 con el detalle JSON del Post creado en la Base de Datos en memoria
- Devuelve HTTP 400 si hay errores en la validación del body de la petición contra el esquema definido

*/

module.exports.create = (req, res, next) => {

    const data = ({ title, text, author} = req.body);

    //console.log(data)
    //console.log(data["title"])
    

    Post.create(data)
        .then((post) => {
            res.status(201).json(post);
        })
        .catch(next);
        
};


/*
4. PATCH /api/posts/<id>
- Recibe body JSON con alguno de los campos title, text y author.
- Devuelve 200 OK con detalle de un Post JSON almacenado en la Base de Datos en memoria tras modificar sus atributos con lo indicado en el body
- Devuelve 404 si el post no existe en la Base de Datos en memoria

*/
module.exports.update = (req, res, next) => {

    const data = ({title, text, author } = req.body);

    Post.findByIdAndUpdate(req.params.id, data, {new:true}) //new true si se quiere modificar al regresar al momento
        .then((post) => {

            if(post) {
                res.status(200).json(post);
            }
            else{
                res.status(404).json({"message": "Post not found"}) 
            }

        })
        .catch(next);

};


/*
5. DELETE /api/posts/<id>
- Devuelve HTTP 204 tras eliminar el post id == <id> de la Base de Datos en memoria
- Devuelve 404 si el post no existe en la Base de Datos en memoria



*/

module.exports.delete = (req, res, next) => {


    Post.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(204).send(); //solo manda las cabeceras
    })
    .catch(next);


};