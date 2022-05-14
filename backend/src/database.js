//Es un archivo para conectarme a MongoDB

const mongoose = require('mongoose'); //Este modulo me permite conectarme a la bd

mongoose.connect('mongodb://localhost/angular-auth', //recibe un string donde esta la bd. Si no existe esa bd, mongodb la crea
{
    useNewUrlParser : true, //Estas dos props las tenia q agregar para q no de error
    useUnifiedTopology : true
}
)
    .then (db => console.log('Database is connected')) //Dsp de conectarte, hace esto
    .catch(err => console.log(err)) //Si no te pudiste conectar, hace esto

