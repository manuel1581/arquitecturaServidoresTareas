const mongoose = require("mongoose");

//mongoose no tiene esquema
//mongoose nos permite crear un esquema para nuestra base de datos
//disenio del modelo
const schema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,

    },

    name: {
        type:String,
        required:true,
    },

    bio: {
        type: String,
        maxlength: 200,
    },

    avatar: {
        type: String,
        required: true,
        default: "https://via.placeholder.com/140x100",
    },

    password: {
        type: String,
        required: true,
        match: /^.{8,}$/,
    }
},{
    timestamps: true, //segundo argumento, y dan el createdAt && updateAt

}
    
    
    
    );


module.exports = mongoose.model("User", schema);