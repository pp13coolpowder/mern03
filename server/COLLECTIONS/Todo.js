const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    todo:{type:String}
})
module.exports=mongoose.model('newtodo',todoSchema);