const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const empleadosRutes = require("./routes/empleados")

//Initiliazations
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(express.json());
app.use('/api', empleadosRutes)

//Routes
app.get("/", (req, res)=>{
    res.send("hola mi ñeri");
})

// Mongodb connection
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('conectado a mongodb'))
.catch((er) => console.error(er))


//Server is listenning
app.listen(app.get('port'), ()=>{
    console.log('server corriendo',app.get('port'))
})