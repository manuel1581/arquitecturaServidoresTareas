const express = require("express");
const router = express.Router();

//importamos el controlador
const posts = require("../controllers/posts.controller");
const user = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
/* 
Se agrega modelo de usuarios
y en vez de escribir la funcion, escribiremos el controlador de usuarios.

router.get("/users", )
*/



//ponemos las funciones definidas en controlador
router.post("/api/posts", auth.checkAuth, posts.create)
router.get("/api/posts", auth.checkAuth, posts.list)
router.get("/api/posts/:id", auth.checkAuth, posts.detal)
router.patch("/api/posts/:id", auth.checkAuth, posts.update)
router.delete("/api/posts/:id", auth.checkAuth, posts.delete)


router.post("/api/users", user.create)
router.post("/api/login", user.login)

//crear nueva ruta para validar el usuario.
router.get("/api/users/:id/validate", user.validate)



module.exports = router;
