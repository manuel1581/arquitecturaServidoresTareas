
//todo lo que haya en el fichero .env se va a crear como variable de entorno.
require("dotenv").config();

//libreria para lanzar errores https.
const createError = require("http-errors");

//libreria principal para APIS
const express = require("express");

//morgan para los logs
const morgan = require("morgan");

//aplicacion 
const app = express();


//Configs
//aqui vamos a hacer que se ejecute el codigo de la "conexion" a BD
//aqui modelamos las conexiones o talbas que tienen la base de datos
require("./config/db.config");


//Middlewares
/* 
El objeto se puede enganchar con un middleware.
Los middlewares son funciones que puedo hacer para que todas las peticiones pasen.
La aplicacion puede ser un tuberia, y pueda haber funciones en cadena (si es que llegan)
El primer middleware programado toma la peticion.
app.use es la forma de anadir un middleware a la tuberia, y app es la tuberia.
app.use recibe una funcion que esta programada para recibir una peticion, respuesta y que representa 
la siguiente funcion de la tuberia o siguiente middleware.

Ejemplos:
Si quiero poner una logica para todas las peticiones que recibe mi servidor, middleware es el situi perfecto para programarla.
un log
gestion de parametros
autenticacion, ya me asegure que mi peticion esta autenticada.
no tengo que llamar next obligatoriamente, puedo cortar el flujo con return.


app.use( (req, res, next)=> {

    console.log("funcion1")
    //return res.send("ERROR")  //en caso que se quierar cortar el flujo.
    next(); //anadir este para irse al siguiente middelware programado.
})

app.use( (req, res, next)=> {

    console.log("funcion2")
    next();
})



Como los middlewares aceptan funciones, nosotros podemos importar una funcion desde otra parte.
Morgan justamente hace eso, nos proporciona una funciona para usar como middlewares.


app.use(morgan("dev"));

Otro middleware es express.json(), nos permite entender automaticamente el body de un request en forma json.

app.use(express.json());
app.use( (req, res, next)=> {

    console.log(req.body);
})


---------------------------------------------------
Usaremos mas el morgan(), y express.json().
---------------------------------------------------


La rutas se agregaran en el folder de rutas, es muy comun tener un ficher donde se encuentran todas las rutas.


*/

app.use(morgan("dev"));
app.use(express.json());



//Routes
const routes = require("./config/routes.config")
app.use("/", routes)



//Error handling





//podemos modificar el puerto 
const port = process.env.PORT || 8000;



app.listen(port, () =>{

    console.log(`Application running on port ${port}`)

})












