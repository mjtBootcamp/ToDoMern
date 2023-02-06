//archivo de node para iniciar el servidor
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const {mongoose} = require('./database')
const app=express();
const PORT=3000;

//Settings
app.set('port', process.env.PORT || PORT); //Puerto servicio dado o por defecto 3000

//Middleware
app.use(morgan('dev'));
app.use(express.json()); //Antes body parse

//Routes
//api/task
app.use('/api/tasks',require('./routes/task.routes'))

//Static file
//console.log(__dirname);
//Encuentra el index.HTML en public 
app.use(express.static(path.join(__dirname, '/public')));


app.listen(app.get('port'), () => console.log(`Run! ${app.get('port')}`))