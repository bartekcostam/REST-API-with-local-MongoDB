const express = require('express');
const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/reg")


const app = express()
app.use(express.json())


const userShema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String
})


const User = new mongoose.model("users", userShema)


app.post('/register', async(req, res) => {
    let user = new User(req.body)
    let result = await user.save()
    res.send(result)
})

app.get('/users', async(req, res) => {
    try{
        const users = await User.find(req.body)
        res.json(users)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: err.message})
    }
})

app.get('/users/:id', async(req, res) =>{
    const result = await User.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }else{
        res.send({result:"No Record found"})
    }
})

app.put('/users/:id', async(req, res) =>{
    const result = await User.updateOne({_id:req.params.id}, {$set:req.body})
    res.send(result)
})

app.delete('/users/:id', async(req, res) => {
    const result = await User.deleteOne({_id:req.params.id})
    res.send(result)
})

app.listen(5000)