const express = require("express");
const router = express.Router();

//importamos el controlador
const posts = require("../controllers/posts.controller");

/* 
Se agrega modelo de usuarios
y en vez de escribir la funcion, escribiremos el controlador de usuarios.

router.get("/users", )
*/



//ponemos las funciones definidas en controlador
router.post("/api/posts", posts.create)
router.get("/api/posts", posts.list)
router.get("/api/posts/:id", posts.detal)
router.patch("/api/posts/:id", posts.update)
router.delete("/api/posts/:id", posts.delete)


module.exports = router;
