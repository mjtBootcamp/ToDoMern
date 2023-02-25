//conectar a bd
const mongoose=require('mongoose');
const URI ='mongodb+srv://mjt:mjttest@cluster0.zrlmqxr.mongodb.net/?retryWrites=true&w=majority';//() local //(url) mongo web

mongoose.set("strictQuery", false);
mongoose.connect(URI)
    .then(db=>console.log('DB is connected'))
    .catch(err=>console.log("error de coneccion",err))

module.exports=mongoose;
