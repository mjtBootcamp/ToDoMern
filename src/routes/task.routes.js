//rutas operacones atraves de url 
const express = require('express');
const router = express.Router();

const Task = require('../models/task')
//index.js // app.use('/api/tasks', require('./routes/task.routes'))
router.get('/', async (req, res)=>{
    const tasks = await Task.find();
    res.json(tasks)   
})

router.get('/:id', async (req, res) => {
    const taskGet = await Task.findById(req.params.id);
    res.json(taskGet)
})

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const nuevatarea=new Task({ title, description}); //Crea una nueva tarea
    await nuevatarea.save()
    res.json(nuevatarea)
})

router.put('/:id', async (req, res) => { //http://localhost:3000/api/tasks/63de7ab863326842aae10e57
    const { title, description } = req.body;
    const tareaModificada = { title, description };
    await Task.findByIdAndUpdate(req.params.id, tareaModificada);
    res.json(tareaModificada)
});

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({status:"tarea eliminada", id : req.params.id})
})

module.exports= router;