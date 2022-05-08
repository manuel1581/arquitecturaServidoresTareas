const mongoose = require("mongoose");
const MongoServer = require("mongodb-memory-server").MongoMemoryServer;


//crear bd en memoria.
MongoServer.create()
           .then((mongoServer) => mongoose.connect(mongoServer.getUri(), {

                dbName: "express-crud"

           })
           .then(() =>{

            console.info("Connected to database");

           })
           .catch((err) => {
               console.error("Error connecting to database: ", err);
           })
           );

//cerrar conexion en caso de ctrl+c
process.on("SIGINT", ()=> {
    mongoose.disconnect();
})
