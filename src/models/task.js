//modelos de la bd
const mongoose= require('mongoose');
const { Schema } = mongoose;

const TaskSquema = new Schema({
    //id: { type: String, required: true},
    title: { type: String, required: true},
    description: { type: String, require: true}
});
module.exports = mongoose.model('Task', TaskSquema);