//conectar a bd
const mongoose=require('mongoose');
const URI ='mongodb://127.0.0.1/mern-task';//() local //(url) mongo web

mongoose.set("strictQuery", false);
mongoose.connect(URI)
    .then(db=>console.log('DB is connected'))
    .catch(err=>console.log("error de coneccion",err))

module.exports=mongoose;