const mongoose = require("mongoose");

//mongoose no tiene esquema
//mongoose nos permite crear un esquema para nuestra base de datos
//disenio del modelo
const schema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        match: /^.{5,}$/,
    },

    text: {
        type: String,
        required: true,
        match: /^.{5,}$/,
    },

    author: {
        type: String,
        required: true,
        match: /^.{5,}$/,
    }
},{
    timestamps: true, //segundo argumento, y dan el createdAt && updateAt    
    //esto es para no entregar ciertos registros.
    toJSON: {
        transform: (doc, ret) => {
            delete ret.__v;
            return ret
        }
    },
}
    
    
    
    );


module.exports = mongoose.model("Post", schema);