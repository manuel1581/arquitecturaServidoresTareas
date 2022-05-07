const express = require("express");
const router = express.Router();

//importamos el controlador
const users = require("../controllers/users_lecture.controller");

/* 
Se agrega modelo de usuarios
y en vez de escribir la funcion, escribiremos el controlador de usuarios.

router.get("/users", )
*/



//ponemos las funciones definidas en controlador
router.get("/users", users.list)
router.get("/users/:id", users.detal)
router.post("/users", users.create)
router.patch("/users/:id", users.update)
router.delete("/users/:id", users.delete)


module.exports = router;
