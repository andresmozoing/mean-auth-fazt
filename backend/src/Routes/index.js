const {Router} = require('express'); //Importo el modulo express
const router = Router(); //Ejecuto la funcion de express llamada router, q devuelve
                        // un objeto para poder manejar las rutas. lo guardo en la cte router
                        //Me va a ayudar para definir URLs
              
const jwt =  require ('jsonwebtoken');

const User = require ('../models/User') //importo el modelo del usuario para poder interactuar con la base de datos

router.get('/', (req,res) => res.send('Hello World'))

router.post('/signup', async (req,res) => { //Tengo q agregarle async para q funcione el await
    
    const {email,password} = req.body; //guardo en una cte lo q venga en el body q tenga este mismo nombre
    const nuevoUsuario = new User({email:email ,password:password}); //crea un nuevo usuario con esos datos
    await nuevoUsuario.save(); //Con este metodo se va a guardar en la bd
                //Este metodo es asincrono, por lo q va a tomar tiempo para guardarse. yo no quiero esperar a q termine entonces para q el servidor continue haciendo cosas le pongo await
    
                //antes de devolver el response, voy a generar un token usando el jwt
    const token = jwt.sign({_id :nuevoUsuario._id},'contrasena'); //3 param el primero es el dato q qremos guardar dentro del token, el 2do es la contraseña q vamos a usar para acceder a ese token
                            //La contraseña podria ser una variable de entorno pero para hacerlo mas rapido la hizo asi nomas
    
    res.status(200).json({token}); //De esta forma puedo definir el estado del responde, y decirle q mande un json con esa informacion dentro
})

router.post('/signin', async (req,res) => { 

    const {email,password} = req.body; //guardo en una cte lo q venga en el body q tenga este mismo nombre
    user = await User.findOne({email:email}) //anda a buscar a la bd si hay algun usuario con este mail
    if (!user) return res.status(401).send("el correo no existe");
    if (user.password !== password) return res.status(401).send("la contrasena es erronea");
            //Se deberia realzar un cifrado de la contraseña pero bueno en este curso es asi nomas
    
    //Si llega aca, es q sus datos son correctos y le puedo devolver un token
    const token = jwt.sign({_id : user._id} , 'contrasena')
    //Le voy a devolver este token cuando se loguee
    res.status(200).json({token}); //De esta forma puedo definir el estado del responde, y decirle q mande un json con esa informacion dentro
})

router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: 1,
            name : 'task1',
            description : 'hola jorege',
            date: ""
        },
        {
            _id: 2,
            name : 'task2',
            description : 'hola jorege',
            date: ""
        },
        {
            _id: 3,
            name : 'task3',
            description :'hola jorege',
            date: ""
        }
    ]
    )
})

router.get('/private-tasks', verifyToken, (req, res) => { //primero se va a ejecutar el verifyToken()

    res.json([
        {
            _id: 1,
            name : 'task1',
            description : 'hola jorege',
            date: ""
        },
        {
            _id: 2,
            name : 'task2',
            description : 'hola jorege',
            date: ""
        },
        {
            _id: 3,
            name : 'task3',
            description :'hola jorege',
            date: ""
        }
    ]
    )
})

//hago una funcion aparte porq voy a verificar en varias peticiones
function verifyToken(req,res,next){ //Esta funcion va a decir si existe el token o no
                            //necesita el parametro next ya q va a ser utilizada desde el enrutador de express
    if (!req.headers.authorization) return res.status(401).send("request no autorizado")
    
    const token = req.headers.authorization.split(' ')[1] //el token es la 2da palabra q viene en "authorization", asiq lo divide con split y toma el 2do (el 1)
    if (token === 'null') {
        return res.status(401).send("request no autorizado") 
    }

    const payload = jwt.verify(token ,'contrasena') //lo q hace esto es dar el dato q estaba dentro del token
    
    //quiero que el id que tengo el payload, viaje en el request en las siguientes peticiones, asiq agrego al req la propiedad userId
    req.userId = payload._id
    next();
}
module.exports = router; 
