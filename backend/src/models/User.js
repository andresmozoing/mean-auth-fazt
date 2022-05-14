//Este archivo va a tener la estructura de los usuarios

const {Schema , model } = require('mongoose'); //Para eso, importo de mongoose estas dos cosas

userSchema = new Schema ({ //defino q datos voy a guardar con el Schema
    email: String,
    password : String
},{
    timestamps : true //Esta propiedad hace q automaticamente se generen las propiedades del tiempo (createdAt y updatedAt)
})

module.exports = model('User',userSchema); //Con este schema, 
                                //creo un modelo q se llama "User",
                                // y lo exporto porq lo voy a usar en otras partes de mi app

