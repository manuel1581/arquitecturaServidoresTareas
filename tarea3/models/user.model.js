const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//mongoose no tiene esquema
//mongoose nos permite crear un esquema para nuestra base de datos
//disenio del modelo
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};



const schema = new mongoose.Schema({

    name: {
        type:String,
        required:true,
    },


    //validation: https://iqcode.com/code/javascript/email-validation-in-mongoose
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },

    password: {
        type: String,
        required: true,
        
    },

    bio: {
        type: String,
        maxlength: 200,
    },

    active: {
        type: Boolean,
        default: false,
    },

    /*
    Este es un tipo join entre esta tabla y la de post

    title: {
        type: mongoose.Types.ObjecId,
        ref: "Post",
    },
    */


},{
    timestamps: true, //segundo argumento, y dan el createdAt && updateAt
    toJSON: {
        transform: (doc, ret) => {
            delete ret.password;
            delete ret.__v;
            return ret
        }
    },
}
    
    
    
    );

//sobre el propio esquema puedo registrar metodos y se puede utilizar desde el controlador
schema.methods.checkPassword = function(pwd) {
    return bcrypt.compare(pwd, this.password);
}

//este codigo se ejecutara antes de crear el usuario.
schema.pre("save", function(next) {

    //modified sirve para crear y modificar
    if (this.isModified("password")){
        bcrypt.hash(this.password, 10)
        .then((hash) => {
            this.password = hash;
            next()
        })
        .catch(next);
    }

})

module.exports = mongoose.model("User", schema);