const mongoose = require('mongoose');
const animeSchema = new mongoose.Schema({
    anime:{type:String},
    name:{type:String},
    aka:{type:String},
    detail:{type:String},
    image:{type:String}
})
module.exports=mongoose.model('anime',animeSchema);