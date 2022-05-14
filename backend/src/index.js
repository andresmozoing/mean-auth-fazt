const express = require ('express'); //Requiero el modulo express y lo guardo en una cte del mismo nombre
const app = express(); //Ejecuto el modulo express y lo guardo en una cte app. Gracias a esta voy a pdoer iniciar mi app
const cors = require('cors') //Requiero el modulo CORS

require ('./database'); 

app.use(express.json()) //Sin esto, la api no entiende el formato JSON.
                //le dice a express, che quiero usar json(). Este json() convierte los datos q le llegan al servidor (un json en el body pro ej) a un objeto javascript q voy a pdoer manipular
                
app.use (cors()) //Cors agrega unas cuantas cabeceras a los request para q se pueda comunicar el servidor del front con el del backend
app.use ('/api',require('./routes/index')) //le digo a express utiliza estas rutas
        //Con esto le digo q todas las rutas tienen q arrancar con /api



app.listen (3000); //Inicio mi aplicacion q escucha en el puerto 3000
console.log('Server on port', 3000)






