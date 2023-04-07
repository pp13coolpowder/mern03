const mongoose = require('mongoose')
const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb+srv://tompplpt:450598@cluster0.7fdw9ft.mongodb.net/?retryWrites=true&w=majority')
        console.log('connect mongoDB....')
    }
    catch(err){
        console.log(err)
    }
}
module.exports=connectDB