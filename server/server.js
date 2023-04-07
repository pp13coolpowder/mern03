const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectDB = require('./DATABASES/db')
const USER = require('./COLLECTIONS/User')
const newtodo = require('./COLLECTIONS/Todo')
const Anime = require('./COLLECTIONS/Anime')
require('dotenv').config();
//////////////
const app = express();
const port =9999
////////////
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())
////////////
connectDB()
//////////////////

/////////////USER
app.post('/register',async(req,res)=>{
    try{
        const{first_name,last_name,email,password}=req.body;
        if(!(email&&password&&first_name&&last_name)){return res.status(433).send('hon')}
        const olduser = await USER.findOne({email})
        if (olduser){return res.status(432).send('Emailนี้สมัครแล้ว ')}
        encryptedPassword = await bcrypt.hash(password,10);
        const user = await USER.create({first_name,last_name,email:email.toLowerCase(),password:encryptedPassword})
        const token = jwt.sign({user_id:user._id,email},process.env.TOKEN_KEY,{expiresIn:'2h'})
        user.token = token;
        res.status(209).json(user);
    }
    catch(error){console.log(error)}
})

app.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!(email&&password)){return res.status(300).send('All input is required')}
        const user = await USER.findOne({email})
        if (user&&(await bcrypt.compare(password,user.password)))
        { const token = jwt.sign({user_id:user._id,email},process.env.TOKEN_KEY,{expiresIn:"2h"})
        user.token=token;
        return res.status(200).json(user)}
        res.status(400).send('invalid credentials😵‍💫😵‍💫😵‍💫😵‍💫')
    }
    catch(error){console.log(error)}
})

app.post('/Auth',(req,res,next)=>{
   
    try{  
        const token = req.headers['id_token']
        const decoded = jwt.verify(token,process.env.TOKEN_KEY) 
        res.json({status:'ok',decoded});
    }
    catch(error){ 
        res.send(error)
       console.log(error)
    }
     next()
})

app.get('/user',async(req,res)=>{

    try{
        const user = await USER.find({}).select("-password").exec();
        res.send(user);
    }
    catch{
        console.log(err);
    res.status(500).send("Server Error!");
    }
})

app.get('/user/:id',async(req,res)=>{

    try{
        const id = req.params.id;
        const user = await USER.findOne({_id: id}).select("-password").exec();
        res.send(user);
    }
    catch{
        console.log(err);
    res.status(500).send("Server Error!");
    }
})

app.delete('/user/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const user = await USER.findOneAndDelete({ _id: id });
        res.send(user);
      } 
      catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
      }
})

app.put('/user/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const{first_name,last_name,email,password}=req.body;
        if(!(email&&password&&first_name&&last_name)){return res.status(434).send('not data')}
        encryptedPassword = await bcrypt.hash(password,10);
        const user = await USER.findOneAndUpdate(
            { _id: id },
            {first_name,last_name,email:email.toLowerCase(),password:encryptedPassword});
        res.send(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
      }
})

////////////////////TODO
app.post('/&todo',async(req,res)=>{
    try{
        const {todo} = req.body
        const old= await newtodo.findOne({todo})
        if(!todo){return res.status(410).json('not')}
        if(old){return res.status(412).json('old')}
        const todos= await newtodo.create({todo})
        console.log(todos)
        res.status(600).json(todos);
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})

app.get('/list&todo',async(req,res)=>{
    try{
        const list = await newtodo.find()
        res.send(list)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})

app.delete('/delete&todo/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const dele = await newtodo.findOneAndDelete({ _id: id })
        res.send(dele)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})

app.put('/update&todo/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const {todo} = req.body
        const old= await newtodo.findOne({todo})
        if(!todo){return res.status(410).json('not')}
        if(old){return res.status(412).json('old')}
        const update = await newtodo.findOneAndUpdate(
            { _id: id },{todo}
        )
        console.log(update)
        res.send(update)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})
//////////////anime
app.post('/anime',async(req,res)=>{
    try{
        const {anime,name,aka,detail,image} = req.body
        const old= await Anime.findOne({name,anime})
        if(!(anime&&name&&aka&&detail&&image)){return res.status(410).json('not')}
        if(old){return res.status(412).json('old')}
        const animes= await Anime.create({anime,name,aka,detail,image})
        console.log(animes)
        res.status(600).json(animes);
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})

app.get('/anime/list',async(req,res)=>{
    try{
        const list = await Anime.find()
        res.send(list)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})

app.get('/anime/list/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const list = await Anime.findOne({_id:id})
        res.send(list)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})

app.delete('/anime/delete/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const list = await Anime.findOneAndDelete({_id:id})
        res.send(list)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})

app.post('/anime/update/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const {anime,name,aka,detail,image} = req.body
        if(!(anime&&name&&aka&&detail&&image)){return res.status(410).json('not')}
        const animes= await Anime.findOneAndUpdate({_id: id},{anime,name,aka,detail,image})
        console.log(animes)
        res.status(600).json(animes);
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})

app.listen(port,()=>console.log(`Server Running on ${port}`))